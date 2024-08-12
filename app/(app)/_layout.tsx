import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function Layout() {
  return (
    <GestureHandlerRootView>
      <RootSiblingParent>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name='login' />
        </Stack>
      </RootSiblingParent>
    </GestureHandlerRootView>
  );
}
