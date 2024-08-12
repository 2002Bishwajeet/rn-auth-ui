import { IconButton } from "@/components/Buttons/IconButton";
import { Input } from "@/components/Input/Input";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { View } from "react-native";

export default function ForgotPassword() {
  return (
    <ThemedView
      style={{
        paddingHorizontal: 24,
      }}
    >
      <IconButton
        icon="chevron-back"
        expand={false}
        onPress={() => router.back()}
        viewStyle={{
          marginVertical: 32,
        }}
      />
      <View>
      <ThemedText type="title">Forgot Password?</ThemedText>

      </View>
      <Input hintText="Enter you email address" />
    </ThemedView>
  );
}
