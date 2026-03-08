import { Link, useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { useAuthStore } from "../store/useAuthStore";

export default function Index() {
  // const router = useRouter();
  // const { user } = useAuthStore();

  // console.log(user);

  // useEffect(() => {
  //   if (user) {
  //     return router.replace("/(tabs)");
  //   } else {
  //     return router.replace("/(auth)/signin");
  //   }
  // }, [user, router]);

  console.log(process.env.EXPO_PUBLIC_APP_API + "/api");

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="mb-10">
        <Link href={'/(auth)/signin'}>Auth</Link>
      </Text>

      <Text>
        <Link href={'/(tabs)'}>Dashboard</Link>
      </Text>
    </View>
  );
}
