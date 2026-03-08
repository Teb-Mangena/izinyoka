import GuestOnly from "@/src/components/auth/GuestOnly";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <GuestOnly>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="signin" />
        <Stack.Screen name="register" />
        <Stack.Screen name="onboarding" />
      </Stack>
    </GuestOnly>
  );
};

export default AuthLayout;
