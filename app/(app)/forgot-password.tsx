import { IconButton } from '@/components/Buttons/IconButton';
import { TextButton } from '@/components/Buttons/TextButton';
import { Input, InputMethods } from '@/components/Input/Input';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/contexts/AuthContext';

import { useThemeColor } from '@/hooks/useThemeColor';
import { router } from 'expo-router';
import { useRef } from 'react';
import { Keyboard, Platform, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Toast from 'react-native-root-toast';

export default function ForgotPassword() {
  const emailRef = useRef<InputMethods>(null);
  const { forgotPassword: recoverPassword } = useAuth();
  const accent = useThemeColor({}, 'tint');
  const onSubmitPress = async () => {
    const email = emailRef.current?.getValue();

    // Validate email
    const isEmailValid = emailRef.current?.validate('email');

    if (!email || !isEmailValid) {
      return;
    }

    Keyboard.dismiss();

    try {
      await recoverPassword(email);
      Toast.show('Reset password link sent to your email', {
        backgroundColor: accent,
        shadow: false,
        containerStyle: {
          borderRadius: 12,
          paddingHorizontal: 16,
        },
      });
    } catch (error: any) {
      Toast.show(error.message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: 'red',
        textColor: 'white',
        opacity: 1,
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView
        style={{
          paddingHorizontal: 24,
          alignItems: 'center',
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
          viewStyle={styles.buttonView}
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
              Don't worry! Just fill in your email and we'll send you a link to reset your password.
            </ThemedText>
          </View>

          <Input
            ref={emailRef}
            hintText='Enter you email address'
            autoCapitalize='none'
            autoComplete='email'
            viewStyle={{ width: '100%' }}
          />
        </View>

        <TextButton
          text='Reset Password'
          filled
          onPress={onSubmitPress}
          filledStyle={{ width: '100%', marginTop: 24 }}
          showLoaderOnPress
        />
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  buttonView: {
    marginTop: 24,
    marginBottom: 36,
    paddingHorizontal: 8,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
});
