import Ionicons from '@expo/vector-icons/Ionicons';
import { ActivityIndicator, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { ThemedText } from '../ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useState } from 'react';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

type IconButtonProps = {
  text?: string;
  icon: string;
  lightColor?: string;
  darkColor?: string;
  onPress: () => Promise<void> | void;
  primary?: boolean;
  reverse?: boolean;
  expand?: boolean;
  textStyle?: TextStyle;
  viewStyle?: ViewStyle;
  showLoaderOnPress?: boolean;
};

export function IconButton({
  icon,
  onPress,
  text,
  lightColor,
  darkColor,
  primary,
  reverse = false,
  expand = false,
  textStyle,
  viewStyle,
  showLoaderOnPress,
}: IconButtonProps) {
  const secondaryColor = useThemeColor({ light: lightColor, dark: darkColor }, 'secondary');
  const primaryColor = useThemeColor({ light: lightColor, dark: darkColor }, 'secondary');
  const tintColor = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');
  const [loading, setLoading] = useState(false);
  const width = useSharedValue(0);

  const handlePress = async () => {
    if (showLoaderOnPress) {
      setLoading(true);
      width.value = withTiming(79);

      await onPress();
      width.value = withTiming(139, undefined, () => {
        runOnJS(setLoading)(false);
      });
    } else {
      onPress();
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
    };
  });

  return (
    <AnimatedTouchableOpacity
      disabled={loading}
      onLayout={e => {}}
      style={[
        animatedStyle,
        {
          alignContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
          borderWidth: 1,
          borderColor: secondaryColor,
          backgroundColor: primary ? primaryColor : undefined,
          width: expand ? '100%' : undefined,
          paddingVertical: 12,
          paddingHorizontal: 24,
        },
        viewStyle,
      ]}
      onPress={handlePress}
    >
      {loading ? (
        <ActivityIndicator
          color={tintColor}
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
            paddingVertical: 2,
          }}
        />
      ) : (
        <Animated.View
          style={{
            justifyContent: expand ? 'center' : undefined,
            flexDirection: reverse ? 'row-reverse' : 'row',
            gap: 12,
          }}
        >
          <Ionicons name={icon as any} size={24} color={tintColor} />
          {text && (
            <ThemedText style={textStyle} type='defaultSemiBold'>
              {text}
            </ThemedText>
          )}
        </Animated.View>
      )}
    </AnimatedTouchableOpacity>
  );
}
