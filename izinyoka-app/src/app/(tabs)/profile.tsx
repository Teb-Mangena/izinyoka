import { Image } from "expo-image";
import { ScrollView, TouchableOpacity, View } from "react-native";

import ThemedIcon from "@/src/components/themes/ThemedIcon";
import ThemedText from "@/src/components/themes/ThemedText";
import ThemedView from "@/src/components/themes/ThemedView";
import { useAuthStore } from "@/src/store/useAuthStore";

const Profile = () => {
  // Mock User Data
  const user = {
    name: "Tebatso Mangena",
    email: "tebatsomangena8@gmail.com",
    reports: 14,
    points: 1250,
    rank: "Grid Guardian",
  };

  const { Logout } = useAuthStore();

  const handlelogout = () => {
    Logout();
  };

  return (
    <ThemedView safe={true} className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* 1. HEADER SECTION */}
        <ThemedView className="items-center pt-8 pb-6 px-6">
          <View className="relative">
            <View className="w-28 h-28 rounded-full border-4 border-primary/20 p-1">
              <Image
                source={{
                  uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sbu",
                }}
                style={{ width: "100%", height: "100%", borderRadius: 50 }}
              />
            </View>
            <View className="absolute bottom-1 right-1 bg-warning p-2 rounded-full border-4 border-background">
              <ThemedIcon name="flash" size={16} />
            </View>
          </View>

          <ThemedText title={true} className="text-2xl mt-4 font-bold">
            {user.name}
          </ThemedText>
          <ThemedText className="text-muted-foreground font-medium">
            {user.email}
          </ThemedText>

          <View className="bg-primary/10 px-4 py-1 rounded-full mt-3 border border-primary/20">
            <ThemedText className="text-primary font-bold text-xs uppercase">
              {user.rank}
            </ThemedText>
          </View>
        </ThemedView>

        {/* 2. STATS GRID (The "Impact" Card) */}
        <ThemedView className="mx-6 p-5 rounded-3xl bg-uiBackground border border-primary/10 shadow-sm flex-row justify-between">
          <View className="items-center flex-1 border-r border-primary/10">
            <ThemedText className="text-primary font-black text-xl">
              {user.reports}
            </ThemedText>
            <ThemedText className="text-xs text-muted-foreground uppercase font-bold">
              Reports
            </ThemedText>
          </View>
          <View className="items-center flex-1 border-r border-primary/10">
            <ThemedText className="text-warning font-black text-xl">
              {user.points}
            </ThemedText>
            <ThemedText className="text-xs text-muted-foreground uppercase font-bold">
              XP Points
            </ThemedText>
          </View>
          <View className="items-center flex-1">
            <ThemedText className="text-green-500 font-black text-xl">
              85%
            </ThemedText>
            <ThemedText className="text-xs text-muted-foreground uppercase font-bold">
              Accuracy
            </ThemedText>
          </View>
        </ThemedView>

        {/* 3. MENU SECTION */}
        <View className="mt-8 px-6 gap-y-4">
          <ThemedText className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">
            Account Settings
          </ThemedText>

          <ProfileMenuItem icon="person-outline" label="Personal Information" />
          <ProfileMenuItem
            icon="notifications-outline"
            label="Alert Preferences"
          />
          <ProfileMenuItem
            icon="shield-checkmark-outline"
            label="Privacy & Security"
          />

          <ThemedText className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1 mt-4">
            Support & Community
          </ThemedText>

          <ProfileMenuItem icon="map-outline" label="Hotspot Map" />
          <ProfileMenuItem icon="help-buoy-outline" label="Safety Guidelines" />

          {/* LOGOUT */}
          <TouchableOpacity
            className="flex-row items-center p-4 mt-4 rounded-2xl bg-red-500/10 border border-red-500/20"
            onPress={handlelogout}
          >
            <ThemedIcon name="log-out-outline" size={22} />
            <ThemedText className="flex-1 ml-4 font-bold text-red-500">
              Log Out
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

// Sub-component for Menu Items
const ProfileMenuItem = ({ icon, label }: { icon: any; label: string }) => (
  <TouchableOpacity className="flex-row items-center p-4 rounded-2xl bg-uiBackground/50 border border-primary/5 active:bg-primary/5">
    <View className="w-10 h-10 items-center justify-center rounded-xl bg-primary/10">
      <ThemedIcon name={icon} size={20} />
    </View>
    <ThemedText className="flex-1 ml-4 font-semibold text-base">
      {label}
    </ThemedText>
    <ThemedIcon name="chevron-forward" size={18} className="opacity-30" />
  </TouchableOpacity>
);

export default Profile;
