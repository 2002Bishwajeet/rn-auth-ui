import { IconButton } from '@/components/Buttons/IconButton';
import { TextButton } from '@/components/Buttons/TextButton';
import { Divider } from '@/components/Divider';
import { Input, InputMethods } from '@/components/Input/Input';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { View } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideInLeft,
  SlideOutLeft,
} from 'react-native-reanimated';

type STATE = 'LOGIN' | 'SIGNUP';

export default function Login() {
  const params = useLocalSearchParams();
  const currState = params['state'] as STATE | undefined;
  const [state, setState] = useState<STATE>(currState || 'SIGNUP');

  const nameRef = useRef<InputMethods>(null);
  const emailRef = useRef<InputMethods>(null);
  const passwordRef = useRef<InputMethods>(null);

  const changeState = useCallback(() => {
    nameRef.current?.clear();
    emailRef.current?.clear();
    passwordRef.current?.clear();
    setState(state === 'LOGIN' ? 'SIGNUP' : 'LOGIN');
  }, [state]);

  const onSubmitPress = () => {
    const name = nameRef.current?.getValue();
    const email = emailRef.current?.getValue();
    const password = passwordRef.current?.getValue();

    // Validate email and password
    const isEmailValid = emailRef.current?.validate('email');
    const isPasswordValid = passwordRef.current?.validate('password');

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    if (state === 'LOGIN') {
      // Login logic
    } else {
      // Signup logic
    }
  };

  const headerText = state === 'LOGIN' ? 'Log in' : 'Sign up';
  const subtitleText =
    state === 'LOGIN' ? 'Welcome back!' : 'Create an account';
  const buttonText = state === 'LOGIN' ? 'Login' : 'Create account';
  const footerText =
    state === 'LOGIN' ? 'Don’t have an account?' : 'Already have an account?';

  return (
    <ThemedView
      style={{
        paddingHorizontal: 24,
      }}
    >
      <View>
        <ThemedText
          key={headerText}
          entering={SlideInLeft}
          exiting={SlideOutLeft}
          style={{
            marginTop: 32,
          }}
          type='title'
        >
          {headerText}
        </ThemedText>
        <ThemedText
          style={{
            marginTop: 8,
          }}
          type='defaultSemiBold'
        >
          {subtitleText}
        </ThemedText>
      </View>
      <Animated.View
        style={{
          gap: 12,
          marginTop: 32,
          marginBottom: 16,
        }}
      >
        {state === 'SIGNUP' && (
          <Input
            ref={nameRef}
            hintText='Name'
            autoCapitalize='sentences'
            maxLength={32}
          />
        )}
        <Input
          ref={emailRef}
          hintText='E-mail'
          inputMode='email'
          autoComplete='email'
          autoCapitalize='none'
          required
        />
        <Input
          ref={passwordRef}
          hintText='Password'
          autoComplete={state === 'LOGIN' ? 'current-password' : 'new-password'}
          autoCapitalize='none'
          obscureText
          required
        />
      </Animated.View>
      <View
        style={{
          gap: 12,
          marginTop: 14,
          marginBottom: 24,
        }}
      >
        <TextButton
          text={buttonText}
          onPress={onSubmitPress}
          filled
          animatedTextProps={{
            entering: FadeIn,
            exiting: FadeOut,
          }}
        />
        {state === 'LOGIN' && (
          <TextButton
            animatedProps={{
              entering: FadeIn,
              exiting: FadeOut,
            }}
            text='Forgot your password?'
            onPress={() => {
              router.navigate('/forgot-password');
            }}
          />
        )}
      </View>
      <Divider text='OR' />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 8,
        }}
      >
        <IconButton icon='logo-google' onPress={() => {}} text='Google' />
        <IconButton icon='logo-facebook' onPress={() => {}} text='Facebook' />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
          justifyContent: 'center',
          marginBottom: 24,
          flexDirection: 'row',
        }}
      >
        <ThemedText
          key={footerText}
          style={{
            justifyContent: 'center',
          }}
        >
          {footerText}{' '}
        </ThemedText>
        <TextButton
          text={state === 'LOGIN' ? 'Signup' : 'Login'}
          onPress={changeState}
        />
      </View>
    </ThemedView>
  );
}
