import { ActivityIndicator, StyleProp, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { ThemedText } from '../ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import Animated, { AnimatedProps, FadeOut } from 'react-native-reanimated';
import { useState } from 'react';
import { TouchableHighlight } from 'react-native-gesture-handler';

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
    console.log(loading, showLoaderOnPress);
    if (showLoaderOnPress) {
      setLoading(true);
      await onPress();
      setLoading(false);
    } else {
      onPress();
    }
  };

  if (filled)
    return (
      <TouchableHighlight
        style={[
          {
            backgroundColor: primaryColor,
            padding: 12,
            alignContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
          },
          filledStyle,
        ]}
        onPress={handlePress}
        underlayColor={secondaryColor}
      >
        {loading ? (
          <ActivityIndicator size={'small'} />
        ) : (
          <ThemedText
            exiting={FadeOut}
            style={{
              color: Colors.dark.text,
            }}
            type='defaultSemiBold'
            {...animatedTextProps}
          >
            {text}
          </ThemedText>
        )}
      </TouchableHighlight>
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
