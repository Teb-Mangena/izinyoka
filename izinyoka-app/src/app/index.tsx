import { Link } from "expo-router";
import { View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient"; 

import ThemedText from "../components/themes/ThemedText";
import ThemedView from "../components/themes/ThemedView";
import ThemedIcon from "../components/themes/ThemedIcon";

export default function Index() {
  return (
    <ThemedView safe={true} className="flex-1 justify-between py-12 px-8">
      
      {/* 1. TOP BRANDING */}
      <ThemedView className="items-center mt-10">
        <View className="w-20 h-20 bg-primary/10 rounded-[22px] items-center justify-center border border-primary/20 rotate-12">
           <ThemedIcon name="flash" size={40} />
        </View>
        <ThemedText title={true} className="text-4xl font-black mt-6 tracking-tighter uppercase">
          Izinyoka<ThemedText className="text-primary">.io</ThemedText>
        </ThemedText>
        <ThemedText className="text-muted-foreground font-medium tracking-[1px] uppercase text-[10px] mt-2">
          Grid Integrity Management System
        </ThemedText>
      </ThemedView>

      {/* 2. MIDDLE DECORATION */}
      <ThemedView className="items-center justify-center">
        <View className="w-full h-[1px] bg-primary/10" />
        <View className="absolute bg-background px-4">
          <ThemedText className="text-muted-foreground/40 font-mono text-xs">
            SYSTEM_READY // 0.0.1
          </ThemedText>
        </View>
      </ThemedView>

      {/* 3. NAVIGATION ACTIONS */}
      <ThemedView className="gap-y-4">
        
        {/* PRIMARY ACTION: SIGN IN */}
        <Link href="/(auth)/signin" asChild>
          <TouchableOpacity 
            activeOpacity={0.8}
            className="bg-primary w-full py-5 rounded-3xl flex-row items-center justify-center shadow-xl shadow-primary/30"
          >
            <ThemedText className="text-white font-black text-lg uppercase mr-2">
              Initialize System
            </ThemedText>
            <ThemedIcon name="arrow-forward" size={20} />
          </TouchableOpacity>
        </Link>

        {/* SECONDARY ACTION: DASHBOARD (DEVELOPER/GUEST BYPASS) */}
        <Link href="/(tabs)" asChild>
          <TouchableOpacity 
            activeOpacity={0.7}
            className="w-full py-5 rounded-3xl border-2 border-primary/20 flex-row items-center justify-center bg-uiBackground/50"
          >
            <ThemedIcon name="speedometer-outline" size={20} className="mr-2" />
            <ThemedText className="font-bold text-primary text-base">
              Bypass to Dashboard
            </ThemedText>
          </TouchableOpacity>
        </Link>

        {/* FOOTER NOTE */}
        <ThemedText className="text-center text-[10px] text-muted-foreground/50 mt-4 leading-4">
          Authorized personnel only. All reporting activities are logged and encrypted using industrial-grade protocols.
        </ThemedText>
      </ThemedView>

    </ThemedView>
  );
}