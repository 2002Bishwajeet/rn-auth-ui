import { IconButton } from '@/components/Buttons/IconButton';
import { TextButton } from '@/components/Buttons/TextButton';
import { Input, InputMethods } from '@/components/Input/Input';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/contexts/AuthContext';

import { useThemeColor } from '@/hooks/useThemeColor';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Keyboard, Platform, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Toast from 'react-native-root-toast';

export default function ForgotPassword() {
  const passwordRef = useRef<InputMethods>(null);
  const confirmPasswordRef = useRef<InputMethods>(null);
  const params = useLocalSearchParams();
  const userId = params['userId'] as string;
  const secret = params['secret'] as string;
  const expire = params['expire'] as string;

  useEffect(() => {
    if (!userId && !secret) {
      router.replace('/');
    }
  }, [userId, secret]);

  useEffect(() => {
    if (!expire) {
      return;
    }
    const currDate = new Date().getTime();

    const decodedExpire = decodeURIComponent(expire);
    const expireDate = new Date(decodedExpire).getTime();

    // If the date is less than the current date, redirect to the login page
    if (currDate > expireDate) {
      Toast.show('Link has expired. Please Try again', {
        shadow: false,
        containerStyle: {
          borderRadius: 12,
        },
      });
      router.replace('/login?state=LOGIN');
    }
  }, [expire]);

  const { resetPassword } = useAuth();
  const accent = useThemeColor({}, 'tint');
  const onSubmitPress = async () => {
    const password = passwordRef.current?.getValue();
    const confirmPassword = confirmPasswordRef.current?.getValue();

    const equalPasswords = password === confirmPassword;

    // Validate password
    const isPasswordValid = password && equalPasswords && passwordRef.current?.validate('password');

    if (!isPasswordValid) {
      if (!equalPasswords)
        Toast.show('Passwords do not match', {
          backgroundColor: 'red',
          shadow: false,
          containerStyle: {
            borderRadius: 12,
            paddingHorizontal: 16,
          },
        });
      return;
    }

    Keyboard.dismiss();

    try {
      await resetPassword(userId, secret, password);
      router.replace('/login?state=LOGIN');
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
            obscureText
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
