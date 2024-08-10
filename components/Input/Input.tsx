import { useThemeColor } from "@/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { forwardRef, useState } from "react";
import { TextInput, TextInputProps } from "react-native";
import Animated from "react-native-reanimated";

export type InputProps = TextInputProps & {
  hintText: string;
  lightColor?: string;
  darkColor?: string;
  obscureText?: boolean;
};

export function Input({
  hintText,
  lightColor,
  darkColor,
  obscureText,
  ...props
}: InputProps) {
  const secondaryColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "secondary"
  );

  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );

  const accentColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "tint"
  );

  const [visible, setVisible] = useState(false);
  return (
    <Animated.View
      style={{
        backgroundColor: `${secondaryColor}3A`,
        borderRadius: 8,
        padding: 16,
        flexDirection: "row",
      }}
    >
      <TextInput
        placeholder={hintText}
        placeholderTextColor={`${textColor}4C`}
        selectionColor={accentColor}
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
          name={visible ? "eye-off" : "eye"}
          size={24}
          color={textColor}
          onPress={() => setVisible(!visible)}
        />
      )}
    </Animated.View>
  );
}
