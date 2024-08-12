import { IconButton } from "@/components/Buttons/IconButton";
import { TextButton } from "@/components/Buttons/TextButton";
import { Divider } from "@/components/Divider";
import { Input } from "@/components/Input/Input";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInLeft,
  SlideOutLeft,
} from "react-native-reanimated";

type STATE = "LOGIN" | "SIGNUP";

export default function Login() {
  const params = useLocalSearchParams();
  const currState = params["state"] as STATE;
  const [state, setState] = useState<STATE>(currState || "SIGNUP");

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
          key={headerText}
          entering={SlideInLeft}
          exiting={SlideOutLeft}
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
      <Animated.View
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
      </Animated.View>
      <View
        style={{
          gap: 12,
          marginTop: 14,
          marginBottom: 24,
        }}
      >
        <TextButton
          text={buttonText}
          onPress={() => {}}
          filled
          animatedTextProps={{
            entering: FadeIn,
            exiting: FadeOut,
          }}
        />
        {state === "LOGIN" && (
          <TextButton
            animatedProps={{
              entering: FadeIn,
              exiting: FadeOut,
            }}
            text="Forgot your password?"
            onPress={() => {
              router.navigate("/forgot-password");
            }}
          />
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
        <TextButton
          text={state === "LOGIN" ? "Signup" : "Login"}
          onPress={changeState}
        />
      </View>
    </ThemedView>
  );
}
