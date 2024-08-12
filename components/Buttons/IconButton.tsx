import Ionicons from '@expo/vector-icons/Ionicons';
import { TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { ThemedText } from '../ThemedText';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

type IconButtonProps = {
  text?: string;
  icon: string;
  lightColor?: string;
  darkColor?: string;
  onPress: () => void;
  primary?: boolean;
  reverse?: boolean;
  expand?: boolean;
  textStyle?: TextStyle;
  viewStyle?: ViewStyle;
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
}: IconButtonProps) {
  const secondaryColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'secondary',
  );
  const primaryColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'secondary',
  );
  const tintColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'tint',
  );
  return (
    <TouchableOpacity
      style={[
        {
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: expand ? 'center' : undefined,
          borderRadius: 8,
          flexDirection: reverse ? 'row-reverse' : 'row',
          gap: 12,
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderColor: secondaryColor,
          borderWidth: 1,
          backgroundColor: primary ? primaryColor : undefined,
          width: expand ? '100%' : undefined,
        },
        viewStyle,
      ]}
      onPress={onPress}
    >
      <Ionicons name={icon as any} size={24} color={tintColor} />
      {text && (
        <ThemedText style={textStyle} type='defaultSemiBold'>
          {text}
        </ThemedText>
      )}
    </TouchableOpacity>
  );
}
