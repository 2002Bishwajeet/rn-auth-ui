import { IconButton } from '@/components/Buttons/IconButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/contexts/AuthContext';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Index() {
  const { logout } = useAuth();
  const { top } = useSafeAreaInsets();
  return (
    <ThemedView
      style={{
        paddingHorizontal: 24,

        alignItems: 'center',
      }}
    >
      <View
        style={{
          position: 'absolute',
          justifyContent: 'flex-end',
          width: '100%',
          top: top + 25,
          alignItems: 'flex-end',
          zIndex: 10,
        }}
      >
        <IconButton icon='log-out-outline' text='Logout' onPress={logout} showLoaderOnPress />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <ThemedText type='subtitle'>Welcome 👋</ThemedText>
        <ThemedText type='default'>You can start editing from this page</ThemedText>
      </View>
    </ThemedView>
  );
}
