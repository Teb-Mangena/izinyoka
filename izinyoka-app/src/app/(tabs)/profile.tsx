import { Image } from "expo-image";
import { ScrollView, TouchableOpacity, View } from "react-native";

import ThemedIcon from "@/src/components/themes/ThemedIcon";
import ThemedText from "@/src/components/themes/ThemedText";
import ThemedView from "@/src/components/themes/ThemedView";
import { useAuthStore } from "@/src/store/useAuthStore";
import ProfileMenuItem from "@/src/components/ProfileMenuItem";

const Profile = () => {
  const {user} = useAuthStore();

  const userReports = {
    reports: 14,
    points: 1250,
    rank: "Grid Guardian",
  }

  const accountSetting = [
    {id:'acc_1', icon:"person-outline",label:'Personal Information'},
    {id:'acc_2', icon:"notifications-outline",label:'Alert Preferences'},
    {id:'acc_13', icon:"shield-checkmark-outline",label:'Privacy & Security'},
  ]

  const supportItems = [
    {id:'sup_11', icon:"map-outline",label:'Hotspot Map'},
    {id:'sup_2', icon:"help-buoy-outline",label:'Safety Guidelines'},
  ]

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
                  uri: user?.profilePic,
                }}
                style={{ width: "100%", height: "100%", borderRadius: 50 }}
              />
            </View>
            <View className="absolute bottom-0 right-0 bg-warning p-1 bg-gray-100 rounded-full border-4 border-background">
              <ThemedIcon name="flash" size={16} />
            </View>
          </View>

          <ThemedText title={true} className="text-2xl mt-4 font-bold">
            {user?.name} {user?.surname}
          </ThemedText>
          <ThemedText className="text-muted-foreground font-medium">
            {user?.email}
          </ThemedText>

          <View className="bg-primary/10 px-4 py-1 rounded-full mt-3 border border-primary/20">
            <ThemedText className="text-primary font-bold text-xs uppercase">
              {userReports.rank}
            </ThemedText>
          </View>
        </ThemedView>

        {/* 2. STATS GRID (The "Impact" Card) */}
        <ThemedView className="mx-6 p-5 rounded-3xl bg-uiBackground border border-primary/10 shadow-sm flex-row justify-between">
          <View className="items-center flex-1 border-r border-primary/10">
            <ThemedText className="text-primary font-black text-xl">
              {userReports.reports}
            </ThemedText>
            <ThemedText className="text-xs text-muted-foreground uppercase font-bold">
              Reports
            </ThemedText>
          </View>
          <View className="items-center flex-1 border-r border-primary/10">
            <ThemedText className="text-warning font-black text-xl">
              {userReports.points}
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

          {accountSetting.map((menuItem) => (
            <ProfileMenuItem key={menuItem.id} id={menuItem.id} icon={menuItem.icon} label={menuItem.label} />
          ))}

          <ThemedText className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1 mt-4">
            Support & Community
          </ThemedText>

          {supportItems.map((item) => (
            <ProfileMenuItem 
              key={item.id} 
              id={item.id} 
              icon={item.icon} 
              label={item.label} 
            />
          ))}

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

export default Profile;
