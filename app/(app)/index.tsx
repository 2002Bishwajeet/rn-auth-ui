import { IconButton } from "@/components/Buttons/IconButton";
import { TextButton } from "@/components/Buttons/TextButton";
import { Divider } from "@/components/Divider";
import { Input } from "@/components/Input/Input";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { View } from "react-native";

// Keep dummy login until the UI is completed
export default function Index() {
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
          Log in
        </ThemedText>
        <ThemedText
          style={{
            marginTop: 8,
          }}
          type="defaultSemiBold"
        >
          Welcome back!
        </ThemedText>
      </View>
      <View
        style={{
          gap: 12,
          marginTop: 32,
          marginBottom: 16,
        }}
      >
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
        <TextButton text="Login" onPress={() => {}} filled />
        <TextButton text="Forgot your password?" onPress={() => {}} />
      </View>
      <Divider text="OR" />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 16,
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
        <TextButton text="Sign up" onPress={() => {}} />
      </View>
    </ThemedView>
  );
}
