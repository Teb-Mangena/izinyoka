import { Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import "../../global.css";
import { Colors } from "../constants/Colors";
import { useAuthStore } from "../store/useAuthStore";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ? Colors[colorScheme] : Colors.light;
  const { checkAuth} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.background,
        },
      }}
    >
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
