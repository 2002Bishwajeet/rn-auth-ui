import {
  StyleProp,
  TextStyle,
  TouchableHighlight,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { ThemedText } from '../ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import Animated, { AnimatedProps } from 'react-native-reanimated';

type TextButtonProps = {
  text: string;
  lightColor?: string;
  darkColor?: string;
  onPress: () => void;
  filled?: boolean;
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
}: TextButtonProps) {
  const primaryColor = useThemeColor({ light: lightColor, dark: darkColor }, 'primary');
  const secondaryColor = useThemeColor({ light: lightColor, dark: darkColor }, 'secondary');
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
        onPress={onPress}
        underlayColor={secondaryColor}
      >
        <ThemedText
          style={{
            color: Colors.dark.text,
          }}
          type='defaultSemiBold'
          {...animatedTextProps}
        >
          {text}
        </ThemedText>
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
