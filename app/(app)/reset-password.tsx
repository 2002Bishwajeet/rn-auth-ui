import { IconButton } from '@/components/Buttons/IconButton';
import { TextButton } from '@/components/Buttons/TextButton';
import { Input, InputMethods } from '@/components/Input/Input';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/contexts/AuthContext';

import { useThemeColor } from '@/hooks/useThemeColor';
import { router } from 'expo-router';
import { useRef } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Toast from 'react-native-root-toast';

export default function ForgotPassword() {
  const passwordRef = useRef<InputMethods>(null);
  const confirmPasswordRef = useRef<InputMethods>(null);
  const { resetPassword } = useAuth();
  const accent = useThemeColor({}, 'tint');
  const onSubmitPress = async () => {
    const password = passwordRef.current?.getValue();
    const confirmPassword = confirmPasswordRef.current?.getValue();

    const equalPasswords = password === confirmPassword;

    // Validate password
    const isPasswordValid = password && equalPasswords && passwordRef.current?.validate('password');

    if (!isPasswordValid) {
      return;
    } else {
      Toast.show('Passwords do not match', {
        backgroundColor: 'red',
        shadow: false,
        containerStyle: {
          borderRadius: 12,
          paddingHorizontal: 16,
        },
      });
    }

    try {
      //   await recoverPassword(email);
      router.back();
      Toast.show('Password Reseted successfully', {
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
        onPress={function () {
          if (router.canGoBack()) return router.back();
          return router.replace('/login?state=LOGIN');
        }}
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
          <ThemedText type='title'>Reset Password?</ThemedText>
          <ThemedText>Enter your new password</ThemedText>
        </View>

        <Input
          ref={passwordRef}
          hintText='New password'
          autoCapitalize='none'
          autoComplete='email'
          viewStyle={{ width: '100%' }}
        />
        <Input
          ref={confirmPasswordRef}
          hintText='Confirm new password'
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
  );
}

const styles = StyleSheet.create({
  buttonView: {
    marginTop: 24,
    marginBottom: 36,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
});
