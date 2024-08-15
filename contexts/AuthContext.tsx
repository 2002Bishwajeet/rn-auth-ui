import { account } from '@/providers/appwrite_provider';
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
          console.warn(e);
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

  const loginWithOAuth = (provider: OAuthProvider) => {
    account.createOAuth2Session(provider, '/login', '/login');
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
