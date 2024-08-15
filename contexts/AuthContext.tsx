import { account } from '@/providers/appwrite_provider';
import { createURL } from 'expo-linking';
import { openAuthSessionAsync } from 'expo-web-browser';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { ID, OAuthProvider } from 'react-native-appwrite';

export type AuthState = 'authenticated' | 'unauthenticated' | 'pending';

export type AuthContextType = {
  login: (email: string, password: string) => Promise<void>;
  loginWithOAuth: (provide: OAuthProvider) => void;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  recoverPassword: (email: string) => Promise<void>;
  confirmRecovery: (userId: string, secret: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  authState: AuthState;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext hasn't been initialized");
  }
  return context;
};

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const [authState, setAuthState] = useState<AuthState>('pending');

  /// Will always run if the state is pending
  useEffect(() => {
    if (authState === 'pending') {
      (async () => {
        const user = await account.get().catch(e => {
          // console.warn(e);
          return null;
        });
        if (user) {
          setAuthState('authenticated');
        } else {
          setAuthState('unauthenticated');
        }
      })();
    }
  }, [authState]);

  const login = useCallback(async (email: string, password: string) => {
    await account.createEmailPasswordSession(email, password);
    setAuthState('pending');
  }, []);

  const loginWithOAuth = async (provider: OAuthProvider) => {
    //REFER : https://discord.com/channels/564160730845151244/1241035472017424404
    // https://github.com/appwrite/sdk-for-react-native/issues/10#issuecomment-2182781560
    // createOAuth2Session would not work as the cookies aren't being returned to the client.
    const redirectUrl = createURL('localhost', { scheme: 'rnauth' }); //HACK: localhost is a hack to get the redirection possible
    const url = account.createOAuth2Token(provider, redirectUrl); // It should never return void but the types say so that needs a fix on the SDK
    if (!url) return;

    const result = await openAuthSessionAsync(url.href, redirectUrl);
    if ('url' in result) {
      const resultUrl = new URL(result.url);
      const secret = resultUrl.searchParams.get('secret');
      const userId = resultUrl.searchParams.get('userId');
      if (!secret || !userId) return;
      await account.createSession(userId, secret);
    }

    setAuthState('pending');
  };

  const signUp = useCallback(
    async (email: string, password: string, name?: string) => {
      await account.create(ID.unique(), email, password, name);
      await login(email, password);
      setAuthState('pending');
    },
    [login],
  );

  const confirmRecovery = async (userId: string, secret: string, password: string) => {
    await account.updateRecovery(userId, secret, password);
  };

  const recoverPassword = useCallback(async (email: string) => {
    await account.createRecovery(email, '/recover');
  }, []);

  const logout = useCallback(async () => {
    await account.deleteSession('current');
    setAuthState('pending');
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, signUp, logout, authState, loginWithOAuth, confirmRecovery, recoverPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};