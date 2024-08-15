import { SessionProvider } from '@/contexts/AuthContext';
import { Slot } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function Layout() {
  return (
    <SessionProvider>
      <GestureHandlerRootView>
        <RootSiblingParent>
          <Slot />
        </RootSiblingParent>
      </GestureHandlerRootView>
    </SessionProvider>
  );
}
