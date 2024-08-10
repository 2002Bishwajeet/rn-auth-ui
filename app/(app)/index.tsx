import { IconButton } from "@/components/Buttons/IconButton";
import { TextButton } from "@/components/Buttons/TextButton";
import { Divider } from "@/components/Divider";
import { Input } from "@/components/Input/Input";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { convertToPascalCase } from "@/utils/utils";
import { useCallback, useState } from "react";
import { View } from "react-native";

type STATE = "LOGIN" | "SIGNUP";

export default function Index() {
  const [state, setState] = useState<STATE>("LOGIN");

  const headerText = state === "LOGIN" ? "Log in" : "Sign up";
  const subtitleText =
    state === "LOGIN" ? "Welcome back!" : "Create an account";
  const buttonText = state === "LOGIN" ? "Login" : "Create account";

  const changeState = useCallback(() => {
    setState(state === "LOGIN" ? "SIGNUP" : "LOGIN");
  }, [state]);

  return (
    <ThemedView
      style={{
        paddingHorizontal: 24,
      }}
    >
      <View>
        <ThemedText
          style={{
            marginTop: 32,
          }}
          type="title"
        >
          {headerText}
        </ThemedText>
        <ThemedText
          style={{
            marginTop: 8,
          }}
          type="defaultSemiBold"
        >
          {subtitleText}
        </ThemedText>
      </View>
      <View
        style={{
          gap: 12,
          marginTop: 32,
          marginBottom: 16,
        }}
      >
        {state === "SIGNUP" && (
          <Input hintText="Name" autoCapitalize="sentences" maxLength={32} />
        )}
        <Input hintText="E-mail" />
        <Input hintText="Password" obscureText />
      </View>
      <View
        style={{
          gap: 12,
          marginTop: 14,
          marginBottom: 24,
        }}
      >
        <TextButton text={buttonText} onPress={() => {}} filled />
        {state === "LOGIN" && (
          <TextButton text="Forgot your password?" onPress={() => {}} />
        )}
      </View>
      <Divider text="OR" />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 8,
        }}
      >
        <IconButton icon="logo-google" onPress={() => {}} text="Google" />
        <IconButton icon="logo-facebook" onPress={() => {}} text="Facebook" />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "flex-end",
          justifyContent: "center",
          marginBottom: 24,
          flexDirection: "row",
        }}
      >
        <ThemedText
          style={{
            justifyContent: "center",
          }}
        >
          Don't have an account?{" "}
        </ThemedText>
        <TextButton text={convertToPascalCase(state)} onPress={changeState} />
      </View>
    </ThemedView>
  );
}
