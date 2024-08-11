import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import { ThemedText } from "../ThemedText";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

type IconButtonProps = {
  text?: string;
  icon: string;
  lightColor?: string;
  darkColor?: string;
  onPress: () => void;
  filled?: boolean;
  primary?: boolean;
  reverse?: boolean;
  expand?: boolean;
};

export function IconButton({
  icon,
  onPress,
  text,
  lightColor,
  darkColor,
  primary,
  reverse,
  expand,
}: IconButtonProps) {
  const secondaryColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "secondary"
  );
  const primaryColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "secondary"
  );
  const tintColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "tint"
  );
  return (
    <TouchableOpacity
      style={{
        alignContent: "center",
        alignItems: "center",
        justifyContent: expand ? "center" : undefined,
        borderRadius: 8,
        flexDirection: reverse ? "row-reverse" : "row",
        gap: 12,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderColor: secondaryColor,
        borderWidth: 1,
        backgroundColor: primary ? primaryColor : undefined,
        width: expand ? "100%" : undefined,
      }}
      onPress={onPress}
    >
      <Ionicons name={icon as any} size={24} color={tintColor} />
      {text && <ThemedText type="defaultSemiBold">{text}</ThemedText>}
    </TouchableOpacity>
  );
}
