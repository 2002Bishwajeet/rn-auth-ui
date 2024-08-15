import { ActivityIndicator, StyleProp, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { ThemedText } from '../ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import Animated, { AnimatedProps, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { TouchableHighlight } from 'react-native-gesture-handler';
import { useState } from 'react';

const AnimatedTouchableHighlight = Animated.createAnimatedComponent(TouchableHighlight);

type TextButtonProps = {
  text: string;
  lightColor?: string;
  darkColor?: string;
  onPress: () => Promise<void> | void;
  filled?: boolean;
  showLoaderOnPress?: boolean;
  unFilledStyle?: StyleProp<ViewStyle>;
  filledStyle?: StyleProp<ViewStyle>;
  animatedProps?: AnimatedProps<ViewStyle>;
  animatedTextProps?: AnimatedProps<TextStyle>;
};

export function TextButton({
  text,
  onPress,
  lightColor,
  darkColor,
  filled,
  unFilledStyle,
  filledStyle,
  animatedProps,
  animatedTextProps,
  showLoaderOnPress,
}: TextButtonProps) {
  const primaryColor = useThemeColor({ light: lightColor, dark: darkColor }, 'primary');
  const secondaryColor = useThemeColor({ light: lightColor, dark: darkColor }, 'secondary');
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    if (showLoaderOnPress) {
      setLoading(true);
      await onPress();
      setLoading(false);
    } else {
      onPress();
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      borderRadius: withTiming(loading ? 98 : 8),
      width: withTiming(loading ? '45%' : '100%'),
    };
  });

  if (filled)
    return (
      <AnimatedTouchableHighlight
        disabled={loading}
        style={[
          {
            backgroundColor: primaryColor,
            padding: 12,
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          },
          filledStyle,
          animatedStyle,
        ]}
        onPress={handlePress}
        underlayColor={secondaryColor}
      >
        {loading ? (
          <ActivityIndicator
            size={'small'}
            style={{
              marginVertical: 2,
            }}
          />
        ) : (
          <ThemedText
            style={{
              color: Colors.dark.text,
            }}
            type='defaultSemiBold'
            {...animatedTextProps}
          >
            {text}
          </ThemedText>
        )}
      </AnimatedTouchableHighlight>
    );

  return (
    <Animated.View {...animatedProps}>
      <TouchableOpacity
        style={[
          {
            alignContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
          },
          unFilledStyle,
        ]}
        onPress={onPress}
      >
        <ThemedText
          style={{
            color: primaryColor,
          }}
          type='default'
          {...animatedTextProps}
        >
          {text}
        </ThemedText>
      </TouchableOpacity>
    </Animated.View>
  );
}
