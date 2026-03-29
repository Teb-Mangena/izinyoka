import { useAuthStore } from "@/src/store/useAuthStore";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import LoadingPage from "../screens/LoadingPage";

type GuestOnlyType = {
  children: React.ReactNode;
};

const GuestOnly = ({ children }: GuestOnlyType) => {
  const { user, authChecked } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (authChecked && user !== null) {
      router.replace("/(tabs)");
    }
  }, [user, authChecked, router]);

  if (!authChecked) {
    return <LoadingPage />;
  }

  if (user !== null) {
    return null;
  }

  return children;
};

export default GuestOnly;
