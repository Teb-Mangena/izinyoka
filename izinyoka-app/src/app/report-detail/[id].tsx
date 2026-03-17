import React from "react";
import { ScrollView, View, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/src/config/axios";
import { Report } from "@/src/types/reports";
import ThemedText from "@/src/components/themes/ThemedText";
import ThemedView from "@/src/components/themes/ThemedView";
import ThemedIcon from "@/src/components/themes/ThemedIcon";

const ReportDetail = () => {
  const { id } = useLocalSearchParams();

  // 1. FETCH SPECIFIC REPORT
  const { data: report, isPending, error } = useQuery<Report>({
    queryKey: ["report", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/reports/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  // 2. LOADING & ERROR STATES
  if (isPending) return <LoadingScreen />;
  if (error || !report) return <ErrorScreen message="Could not find report details" />;

  const statusStyle = getStatusStyle(report.status);

  return (
    <ThemedView className="flex-1">
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        
        {/* HERO IMAGE SECTION */}
        <View className="relative w-full h-96">
          <Image
            source={{ uri: report.image?.secure_url }}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
            transition={500}
          />

          {/* Status Badge Overlay */}
          <View className={`absolute bottom-6 right-6 ${statusStyle.bg} px-4 py-2 rounded-2xl border border-white/20`}>
            <ThemedText className={`${statusStyle.text} font-black uppercase tracking-widest text-xs`}>
              {report.status || "Pending"}
            </ThemedText>
          </View>
        </View>

        {/* CONTENT SECTION */}
        <View className="px-6 -mt-8 bg-uiBackground rounded-t-[40px] pt-8 pb-20">
          
          {/* TITLE & LOCATION */}
          <View className="mb-6">
            <ThemedText title className="text-3xl font-black mb-2 leading-tight">
              {report.title}
            </ThemedText>
            <View className="flex-row items-center opacity-70">
              <ThemedIcon name="location" size={18} className="text-primary" />
              <ThemedText className="ml-2 font-semibold">{report.location}</ThemedText>
            </View>
          </View>

          {/* AI VERIFICATION CARD */}
          <AIReviewCard aiData={report.AIVerified} />

          {/* DESCRIPTION */}
          <View className="mt-8">
            <ThemedText className="text-sm font-bold uppercase text-muted-foreground tracking-tighter mb-3">
              Case Description
            </ThemedText>
            <ThemedText className="text-lg leading-7 opacity-80">
              {report.description || "No description provided for this report."}
            </ThemedText>
          </View>

          {/* TIMELINE INFO */}
          <View className="mt-8 pt-8 border-t border-primary/5 flex-row justify-between">
            <View>
              <ThemedText className="text-[10px] font-bold text-muted-foreground uppercase">Submitted On</ThemedText>
              <ThemedText className="font-bold">{new Date(report.createdAt).toDateString()}</ThemedText>
            </View>
            <View className="items-end">
              <ThemedText className="text-[10px] font-bold text-muted-foreground uppercase">Report ID</ThemedText>
              <ThemedText className="font-bold opacity-50">#{report._id.slice(-6).toUpperCase()}</ThemedText>
            </View>
          </View>

        </View>
      </ScrollView>
    </ThemedView>
  );
};

// --- SUB-COMPONENTS ---

const AIReviewCard = ({ aiData }: { aiData: Report["AIVerified"] }) => {
  const isVerified = aiData?.verified === "true" || aiData?.verified === "yes";
  
  return (
    <View className={`p-5 rounded-3xl border ${isVerified ? 'bg-blue-500/5 border-blue-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
      <View className="flex-row items-center mb-3">
        <View className={`p-2 rounded-xl ${isVerified ? 'bg-blue-500' : 'bg-red-500'}`}>
          <ThemedIcon name={isVerified ? "shield-checkmark" : "warning"} size={20} />
        </View>
        <ThemedText className="ml-3 font-black text-sm uppercase tracking-tight">
          AI Analysis {isVerified ? "Passed" : "Flagged"}
        </ThemedText>
      </View>
      <ThemedText className="text-sm opacity-90 leading-5">
        {aiData?.feedback || "No AI feedback available yet."}
      </ThemedText>
    </View>
  );
};

const LoadingScreen = () => (
  <ThemedView className="flex-1 items-center justify-center">
    <ActivityIndicator size="large" color="#4A90E2" />
  </ThemedView>
);

const ErrorScreen = ({ message }: { message: string }) => (
  <ThemedView className="flex-1 items-center justify-center p-10">
    <ThemedIcon name="alert-circle" size={60} />
    <ThemedText className="text-center mt-4 font-bold">{message}</ThemedText>
  </ThemedView>
);

// --- STYLES ---
const getStatusStyle = (status?: string) => {
  switch (status) {
    case "Resolved": return { bg: "bg-green-500", text: "text-white" };
    case "Investigating": return { bg: "bg-primary", text: "text-white" };
    default: return { bg: "bg-warning", text: "text-black" };
  }
};

export default ReportDetail;