import { IconButton } from '@/components/Buttons/IconButton';
import { TextButton } from '@/components/Buttons/TextButton';
import { Input, InputMethods } from '@/components/Input/Input';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import { useRef } from 'react';
import { Platform, View } from 'react-native';

export default function ForgotPassword() {
  const emailRef = useRef<InputMethods>(null);

  const onSubmitPress = () => {
    const email = emailRef.current?.getValue();

    // Validate email
    const isEmailValid = emailRef.current?.validate('email');

    if (!isEmailValid) {
      return;
    }

    // Send reset password link
  };

  return (
    <ThemedView
      style={{
        paddingHorizontal: 24,
        alignItems: 'flex-start',
      }}
    >
      <IconButton
        icon={Platform.select({
          ios: 'chevron-back',
          android: 'arrow-back',
          default: 'chevron-back',
        })}
        expand={false}
        onPress={() => router.back()}
        viewStyle={{
          marginTop: 24,
          marginBottom: 36,
          paddingHorizontal: 8,
          paddingVertical: 6,
        }}
      />
      <View
        style={{
          gap: 24,
          alignItems: 'flex-start',
        }}
      >
        <View
          style={{
            gap: 12,
          }}
        >
          <ThemedText type='title'>Forgot Password?</ThemedText>
          <ThemedText>
            Don't worry! Just fill in your email and we'll send you a link to
            reset your password.
          </ThemedText>
        </View>

        <Input
          ref={emailRef}
          hintText='Enter you email address'
          autoCapitalize='none'
          autoComplete='email'
          style={{ width: '100%' }}
        />
      </View>
      <TextButton
        text='Reset Password'
        filled
        onPress={onSubmitPress}
        filledStyle={{ width: '100%', marginTop: 24 }}
      />
    </ThemedView>
  );
}
