import AnimatedIcon from '@/components/AnimatedIcon';
import { IconButton } from '@/components/Buttons/IconButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import { Platform, View } from 'react-native';
export default function Index() {
  return (
    <ThemedView
      style={{
        paddingHorizontal: 24,
      }}
    >
      <View>
        <ThemedText
          style={{
            marginTop: 32,
            fontStyle: 'italic',
          }}
          type='title'
        >
          Auth UI
        </ThemedText>
        <ThemedText
          style={{
            marginTop: 8,
          }}
          type='defaultSemiBold'
        >
          Powered by React Native and Appwrite 🚀
        </ThemedText>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <AnimatedIcon />
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginBottom: Platform.OS === 'android' ? 16 : 0,
        }}
      >
        <IconButton
          text='Get Started'
          onPress={() => {
            router.replace('/login?state=SIGNUP');
          }}
          icon='arrow-forward'
          expand
          primary
          reverse
        />
      </View>
    </ThemedView>
  );
}
