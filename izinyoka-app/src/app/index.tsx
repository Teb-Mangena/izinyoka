import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { useAuthStore } from "../store/useAuthStore";

export default function Index() {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      return router.replace("/(tabs)");
    } else {
      return router.replace("/(auth)/signin");
    }
  }, [user, router]);

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
