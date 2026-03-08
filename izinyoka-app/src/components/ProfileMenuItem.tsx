import { TouchableOpacity, View } from "react-native";
import ThemedIcon from "./themes/ThemedIcon";
import ThemedText from "./themes/ThemedText";
import { useRouter } from "expo-router";

const ProfileMenuItem = ({ id, icon, label }: { id:string, icon: any; label: string }) => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push({
      pathname:'/account/[id]',
      params: { id }
    })
    console.log("Pressed", label);
  }

  return (
    <TouchableOpacity
      onPress={handleNavigation}
      className="flex-row items-center p-4 rounded-2xl bg-uiBackground/50 border border-primary/5 active:bg-primary/5"
    >
      <View className="w-10 h-10 items-center justify-center rounded-xl bg-primary/10">
        <ThemedIcon name={icon} size={20} />
      </View>
      <ThemedText className="flex-1 ml-4 font-semibold text-base">
        {label}
      </ThemedText>
      <ThemedIcon name="chevron-forward" size={18} className="opacity-30" />
    </TouchableOpacity>
  );
};

export default ProfileMenuItem;
