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
};

export function IconButton({
  icon,
  onPress,
  text,
  lightColor,
  darkColor,
}: IconButtonProps) {
  const secondaryColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "secondary"
  );
  const primaryColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "tint"
  );
  return (
    <TouchableOpacity
      style={{
        alignContent: "center",
        alignItems: "center",
        borderRadius: 8,
        flexDirection: "row",
        gap: 12,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderColor: secondaryColor,
        borderWidth: 1,
      }}
      onPress={onPress}
    >
      <Ionicons name={icon as any} size={24} color={primaryColor} />
      {text && <ThemedText type="defaultSemiBold">{text}</ThemedText>}
    </TouchableOpacity>
  );
}
