import { Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import "../../global.css";
import { Colors } from "../constants/Colors";
import { useAuthStore } from "../store/useAuthStore";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ThemedView from "../components/themes/ThemedView";
import Toast from "react-native-toast-message";

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ? Colors[colorScheme] : Colors.light;
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemedView className="flex-1" safe={false}>
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
        <StatusBar style="auto" />
        <Toast />
      </ThemedView>
    </QueryClientProvider>
  );
}
