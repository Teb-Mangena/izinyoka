import { useAuthStore } from "@/src/store/useAuthStore";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";

type UserOnlyType = {
  children: React.ReactNode;
};

const UserOnly = ({ children }: UserOnlyType) => {
  const { user, authChecked } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (authChecked && user === null) {
      router.replace("/(auth)/signin");
    }
  }, [user, authChecked, router]);

  if (authChecked && user === null) return null;

  if (!authChecked || !user) {
    return <ActivityIndicator size="large" />;
  }

  return children;
};

export default UserOnly;
