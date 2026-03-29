import { useAuthStore } from "@/src/store/useAuthStore";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import LoadingPage from "../screens/LoadingPage";

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

  // if (authChecked && user === null) return null;

  if (!authChecked || !user) {
    return <LoadingPage />;
  }

  return children;
};

export default UserOnly;
