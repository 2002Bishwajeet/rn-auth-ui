import {
  Pressable,
  StyleProp,
  TouchableHighlight,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { ThemedText } from "../ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

type TextButtonProps = {
  text: string;
  lightColor?: string;
  darkColor?: string;
  onPress: () => void;
  filled?: boolean;
  unFilledStyle?: StyleProp<ViewStyle>;
  filledStyle?: StyleProp<ViewStyle>;
};

export function TextButton({
  text,
  onPress,
  lightColor,
  darkColor,
  filled,
  unFilledStyle,
  filledStyle,
}: TextButtonProps) {
  const primaryColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "primary"
  );
  const secondaryColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "secondary"
  );
  if (filled)
    return (
      <TouchableHighlight
        style={[
          {
            backgroundColor: primaryColor,
            padding: 12,
            alignContent: "center",
            alignItems: "center",
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
          type="defaultSemiBold"
        >
          {text}
        </ThemedText>
      </TouchableHighlight>
    );

  return (
    <TouchableOpacity
      style={[
        {
          alignContent: "center",
          alignItems: "center",
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
        type="default"
      >
        {text}
      </ThemedText>
    </TouchableOpacity>
  );
}
