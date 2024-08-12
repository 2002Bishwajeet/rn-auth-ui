import { useThemeColor } from '@/hooks/useThemeColor';
import { isValidEmail } from '@/utils/utils';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { forwardRef, memo, Ref, useImperativeHandle, useState } from 'react';
import { TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import Animated, { FadeIn, FadeInLeft, FadeOutUp, LinearTransition } from 'react-native-reanimated';
import { ThemedText } from '../ThemedText';

export type InputProps = TextInputProps & {
  hintText: string;
  required?: boolean;
  lightColor?: string;
  darkColor?: string;
  obscureText?: boolean;
  viewStyle?: ViewStyle;
};

export type ValidationType = 'email' | 'password' | 'text';

export type InputMethods = {
  getValue: () => string;
  validate: (type: ValidationType) => boolean;
  clear: () => void;
};

export const Input = memo(
  forwardRef(
    (
      { hintText, lightColor, darkColor, obscureText, required, viewStyle, ...props }: InputProps,
      ref: Ref<InputMethods>,
    ) => {
      const secondaryColor = useThemeColor({ light: lightColor, dark: darkColor }, 'secondary');

      const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

      const accentColor = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');

      const [visible, setVisible] = useState(false);
      const [value, setValue] = useState<string>();
      const [error, setError] = useState<string | null>();

      useImperativeHandle(
        ref,
        () => ({
          getValue: () => {
            return value || '';
          },
          validate: (type: ValidationType) => {
            if (!value && required) {
              setError(`${hintText} cannot be empty`);
              return false;
            }
            switch (type) {
              case 'email':
                if (!isValidEmail(value || '')) {
                  setError('Invalid email address');
                  return false;
                }
                return true;
              case 'password':
                if ((value?.length ?? 0) < 8) {
                  setError('Password must be at least 8 characters long');
                  return false;
                }
                return true;
              default:
                return true;
            }
          },
          clear: () => {
            setValue('');
            setError(null);
          },
        }),
        [hintText, required, value],
      );

      return (
        <View>
          <Animated.View
            key={hintText}
            entering={FadeInLeft}
            exiting={FadeOutUp}
            layout={LinearTransition}
            style={[
              {
                backgroundColor: `${secondaryColor}3A`,
                borderRadius: 8,
                padding: 16,
                flexDirection: 'row',
              },
              viewStyle,
            ]}
          >
            <TextInput
              placeholder={hintText}
              placeholderTextColor={`${textColor}4C`}
              selectionColor={accentColor}
              value={value}
              onChangeText={e => {
                if (error) setError(null);
                return setValue(e);
              }}
              style={{
                color: textColor,
                fontSize: 16,
                flex: 1,
              }}
              secureTextEntry={obscureText && !visible}
              {...props}
            />
            {obscureText && (
              <Ionicons
                name={visible ? 'eye-off' : 'eye'}
                size={24}
                color={`${textColor}4C`}
                suppressHighlighting
                onPress={() => setVisible(!visible)}
              />
            )}
          </Animated.View>
          {error && (
            <ThemedText
              style={{
                color: 'red',
                marginLeft: 8,
                marginTop: 8,
              }}
              entering={FadeIn}
            >
              {error}
            </ThemedText>
          )}
        </View>
      );
    },
  ),
);
