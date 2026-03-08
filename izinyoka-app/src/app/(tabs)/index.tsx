import { Dimensions, ScrollView, TouchableOpacity, View } from "react-native";

import ThemedIcon from "@/src/components/themes/ThemedIcon";
import ThemedText from "@/src/components/themes/ThemedText";
import ThemedView from "@/src/components/themes/ThemedView";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const Uploads = () => {
  const router = useRouter();
  return (
    <ThemedView safe={true} className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* 1. TOP BAR / GREETING */}
        <ThemedView className="px-6 pt-4 flex-row justify-between items-center">
          <View>
            <ThemedText className="text-muted-foreground font-medium">
              Welcome back,
            </ThemedText>
            <ThemedText title={true} className="text-2xl font-black">
              Tebatso ⚡️
            </ThemedText>
          </View>
          <TouchableOpacity className="w-12 h-12 rounded-2xl bg-uiBackground border border-primary/10 items-center justify-center">
            <ThemedIcon name="notifications-outline" size={24} />
            <View className="absolute top-3 right-3 w-2 h-2 bg-warning rounded-full border-2 border-background" />
          </TouchableOpacity>
        </ThemedView>

        {/* 2. GRID STATUS CARD (Interactive look) */}
        <ThemedView className="mx-6 mt-6 p-5 rounded-[32px] bg-primary overflow-hidden relative">
          {/* Decorative Background Pattern */}
          <View className="absolute -right-10 -top-10 opacity-10">
            <ThemedIcon name="flash" size={180} />
          </View>

          <View className="flex-row justify-between items-center">
            <View>
              <ThemedText className="text-white/70 font-bold uppercase text-[10px] tracking-widest">
                Current Grid Status
              </ThemedText>
              <ThemedText className="text-white text-2xl font-black mt-1">
                Stage 0{" "}
                <ThemedText className="text-white/60 text-lg font-normal">
                  Active
                </ThemedText>
              </ThemedText>
            </View>
            <View className="bg-white/20 px-3 py-1 rounded-full border border-white/30">
              <ThemedText className="text-white font-bold text-xs">
                Stable
              </ThemedText>
            </View>
          </View>

          <View className="mt-4 flex-row gap-4">
            <View className="flex-1 bg-white/10 p-3 rounded-2xl border border-white/10">
              <ThemedText className="text-white/60 text-[10px] font-bold uppercase">
                Saved Power
              </ThemedText>
              <ThemedText className="text-white font-black text-lg">
                12.4 kW
              </ThemedText>
            </View>
            <View className="flex-1 bg-white/10 p-3 rounded-2xl border border-white/10">
              <ThemedText className="text-white/60 text-[10px] font-bold uppercase">
                Global Rank
              </ThemedText>
              <ThemedText className="text-white font-black text-lg">
                #412
              </ThemedText>
            </View>
          </View>
        </ThemedView>

        {/* 3. MAIN ACTION: THE "IZINYOKA" BUTTON */}
        <ThemedView className="px-6 mt-8">
          <ThemedText className="text-xs font-bold text-muted-foreground uppercase tracking-[2px] mb-4 ml-1">
            Emergency Actions
          </ThemedText>

          <TouchableOpacity
            activeOpacity={0.9}
            className="w-full bg-uiBackground rounded-[32px] p-1 border-2 border-primary/20 shadow-xl shadow-primary/20"
            onPress={() => router.push("/upload")}
          >
            <View className="bg-primary/5 rounded-[28px] p-6 flex-row items-center">
              <View className="w-16 h-16 bg-warning rounded-2xl items-center justify-center rotate-3 shadow-lg shadow-warning/40">
                <ThemedIcon name="camera" size={32} />
              </View>
              <View className="ml-5 flex-1">
                <ThemedText className="text-xl font-black text-primary uppercase leading-tight">
                  Report{" "}
                  <ThemedText className="text-foreground">Izinyoka</ThemedText>
                </ThemedText>
                <ThemedText className="text-muted-foreground text-xs mt-1 font-medium">
                  Snap evidence and mark location
                </ThemedText>
              </View>
              <ThemedIcon
                name="chevron-forward"
                size={20}
                className="opacity-30"
              />
            </View>
          </TouchableOpacity>
        </ThemedView>

        {/* 4. RECENT ACTIVITY PREVIEW */}
        <ThemedView className="px-6 mt-10">
          <View className="flex-row justify-between items-center mb-4">
            <ThemedText className="text-xs font-bold text-muted-foreground uppercase tracking-[2px] ml-1">
              Safety Highlights
            </ThemedText>
            <TouchableOpacity>
              <ThemedText className="text-primary font-bold text-xs">
                View All
              </ThemedText>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="-mx-6 px-6"
          >
            <TipCard
              title="Avoid Ground Cables"
              desc="Exposed wiring is extremely dangerous during rain."
              icon="rainy-outline"
              color="#3399CC"
            />
            <TipCard
              title="Tamper Alerts"
              desc="Reporting meter bypass helps lower local tariffs."
              icon="alert-circle-outline"
              color="#FACC15"
            />
          </ScrollView>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
};

// Sub-component for Safety Tips
const TipCard = ({ title, desc, icon, color }: any) => (
  <View
    style={{ width: width * 0.7, backgroundColor: "rgba(148, 163, 184, 0.05)" }}
    className="mr-4 p-5 rounded-3xl border border-primary/5"
  >
    <View
      style={{ backgroundColor: `${color}20` }}
      className="w-10 h-10 rounded-xl items-center justify-center mb-3"
    >
      <ThemedIcon name={icon} size={20} />
    </View>
    <ThemedText className="font-bold text-lg mb-1">{title}</ThemedText>
    <ThemedText className="text-muted-foreground text-sm leading-5">
      {desc}
    </ThemedText>
  </View>
);

export default Uploads;
