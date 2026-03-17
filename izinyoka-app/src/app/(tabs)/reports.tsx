import React, { useCallback } from "react";
import { ActivityIndicator, FlatList, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { useQuery } from "@tanstack/react-query";
import { useFocusEffect } from "@react-navigation/native";

import { axiosInstance } from "@/src/config/axios";
import { Report } from "@/src/types/reports";
import ThemedIcon from "@/src/components/themes/ThemedIcon";
import ThemedText from "@/src/components/themes/ThemedText";
import ThemedView from "@/src/components/themes/ThemedView";


const getMyReports = async (): Promise<Report[]> => {
  const res = await axiosInstance.get<Report[]>("/reports/my");
  return res.data;
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const Reports = () => {
  // 1. THE QUERY WITH POLLING
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["reports"],
    queryFn: getMyReports,
    
    // AUTO-UPDATE SETTINGS
    refetchInterval: 5000,
    refetchIntervalInBackground: false,
    staleTime: 0, 
    refetchOnWindowFocus: true,
  });

  // 2. FOCUS-BASED REFRESH
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  // 3. RENDER STATES
  if (isPending) return <LoadingState />;
  if (error) return <ErrorState />;

  return (
    <ThemedView safe={true} className="flex-1">
      {/* Header Section */}
      <View className="px-6 pt-4 pb-2 flex-row justify-between items-end">
        <View>
          <ThemedText title={true} className="text-3xl font-black">
            My <ThemedText className="text-primary">Reports</ThemedText>
          </ThemedText>
          <ThemedText className="text-muted-foreground font-medium">
            {data?.length ?? 0} active cases
          </ThemedText>
        </View>
        
        {/* Manual Refresh Button (Good for user feedback) */}
        <TouchableOpacity 
          onPress={() => refetch()} 
          className="p-2 bg-uiBackground rounded-xl border border-primary/10"
        >
          <ThemedIcon name="refresh-circle-outline" size={20} />
        </TouchableOpacity>
      </View>

      {/* Reports List */}
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ padding: 24, gap: 16 }}
        renderItem={({ item }) => <ReportCard report={item} />}
        ListEmptyComponent={<EmptyState />}
        onRefresh={refetch}
        refreshing={isPending}
      />
    </ThemedView>
  );
};

// --- SUB-COMPONENTS ---

const ReportCard = ({ report }: { report: Report }) => {
  const status = getStatusStyle(report.status);

  return (
    <TouchableOpacity
      className="bg-uiBackground rounded-3xl p-4 border border-primary/5 shadow-sm active:scale-[0.98]"
      onPress={() => console.log("Report pressed", report._id)}
    >
      <View className="flex-row items-center">
        <Image
          source={{ uri: report.image.secure_url }}
          style={{ width: 70, height: 70, borderRadius: 16 }}
          contentFit="cover"
        />

        <View className="flex-1 ml-4">
          <View className="flex-row justify-between items-start">
            <ThemedText className="font-bold text-lg">{report.title}</ThemedText>
            <View className={`${status.bg} px-3 py-1 rounded-full`}>
              <ThemedText className={`${status.text} text-[10px] font-black uppercase`}>
                {report.status ?? "Pending"}
              </ThemedText>
            </View>
          </View>

          <View className="flex-row items-center mt-1">
            <ThemedIcon name="location-outline" size={14} className="opacity-50" />
            <ThemedText className="text-muted-foreground text-xs ml-1">{report.location}</ThemedText>
          </View>

          <ThemedText className="text-[10px] text-muted-foreground/60 font-bold mt-2">
            SUBMITTED: {formatDate(report.createdAt)}
          </ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// --- CONSTANTS & UI HELPERS ---

const getStatusStyle = (status?: string) => {
  const styles = {
    Resolved: { bg: "bg-green-500/10", text: "text-green-500" },
    Investigating: { bg: "bg-primary/10", text: "text-primary" },
    default: { bg: "bg-warning/10", text: "text-warning" },
  };
  return styles[status as keyof typeof styles] || styles.default;
};

const LoadingState = () => (
  <ThemedView safe className="flex-1 items-center justify-center">
    <ActivityIndicator size="large" color="#4A90E2" />
    <ThemedText className="mt-4 text-muted-foreground">Loading reports...</ThemedText>
  </ThemedView>
);

const ErrorState = () => (
  <ThemedView safe className="flex-1 items-center justify-center">
    <ThemedIcon name="alert-circle-outline" size={50} className="text-red-500" />
    <ThemedText className="mt-4 text-red-500">Failed to load reports</ThemedText>
  </ThemedView>
);

const EmptyState = () => (
  <ThemedView className="items-center justify-center mt-20">
    <ThemedIcon name="document-text-outline" size={60} className="opacity-20" />
    <ThemedText className="mt-4 text-muted-foreground">No reports found yet.</ThemedText>
  </ThemedView>
);

export default Reports;