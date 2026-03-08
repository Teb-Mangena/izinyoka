import { Image } from "expo-image";
import { FlatList, TouchableOpacity, View } from "react-native";

import ThemedIcon from "@/src/components/themes/ThemedIcon";
import ThemedText from "@/src/components/themes/ThemedText";
import ThemedView from "@/src/components/themes/ThemedView";

// Mock Data for Reports
const MOCK_REPORTS = [
  {
    id: "INC-8829",
    date: "14 Feb 2024",
    location: "Soweto, Zone 4",
    status: "Pending",
    image: "https://picsum.photos/id/210/200/200",
  },
  {
    id: "INC-7741",
    date: "10 Feb 2024",
    location: "Tembisa, Sect 2",
    status: "Resolved",
    image: "https://picsum.photos/id/211/200/200",
  },
  {
    id: "INC-6502",
    date: "02 Feb 2024",
    location: "Sandton, Ext 5",
    status: "Investigating",
    image: "https://picsum.photos/id/212/200/200",
  },
];

const Reports = () => {
  return (
    <ThemedView safe={true} className="flex-1">
      {/* 1. HEADER & FILTER */}
      <ThemedView className="px-6 pt-4 pb-2 flex-row justify-between items-end">
        <View>
          <ThemedText title={true} className="text-3xl font-black">
            My <ThemedText className="text-primary">Reports</ThemedText>
          </ThemedText>
          <ThemedText className="text-muted-foreground font-medium">
            Tracking {MOCK_REPORTS.length} active cases
          </ThemedText>
        </View>
        <TouchableOpacity className="p-2 bg-uiBackground rounded-xl border border-primary/10">
          <ThemedIcon name="filter-outline" size={20} />
        </TouchableOpacity>
      </ThemedView>

      {/* 2. REPORTS LIST */}
      <FlatList
        data={MOCK_REPORTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 24, gap: 16 }}
        renderItem={({ item }) => <ReportCard report={item} />}
        ListEmptyComponent={
          <ThemedView className="items-center justify-center mt-20">
            <ThemedIcon
              name="document-text-outline"
              size={60}
              className="opacity-20"
            />
            <ThemedText className="mt-4 text-muted-foreground">
              No reports found yet.
            </ThemedText>
          </ThemedView>
        }
      />
    </ThemedView>
  );
};

// Sub-component for individual Report Cards
const ReportCard = ({ report }: { report: (typeof MOCK_REPORTS)[0] }) => {
  // Logic for status colors
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Resolved":
        return {
          bg: "bg-green-500/10",
          text: "text-green-500",
          icon: "checkmark-circle",
        };
      case "Investigating":
        return {
          bg: "bg-primary/10",
          text: "text-primary",
          icon: "search-outline",
        };
      default:
        return {
          bg: "bg-warning/10",
          text: "text-warning",
          icon: "time-outline",
        };
    }
  };

  const statusStyle = getStatusStyle(report.status);

  return (
    <TouchableOpacity
      className="bg-uiBackground rounded-3xl p-4 border border-primary/5 shadow-sm active:scale-[0.98] transition-all"
      onPress={() => console.log("Report pressed", report.id)}
    >
      <View className="flex-row items-center">
        {/* Evidence Thumbnail */}
        <Image
          source={{ uri: report.image }}
          style={{ width: 70, height: 70, borderRadius: 16 }}
          contentFit="cover"
        />

        <View className="flex-1 ml-4">
          <View className="flex-row justify-between items-start">
            <ThemedText className="font-bold text-lg">{report.id}</ThemedText>
            {/* Custom Status Badge */}
            <View
              className={`${statusStyle.bg} px-3 py-1 rounded-full flex-row items-center`}
            >
              <ThemedText
                className={`${statusStyle.text} text-[10px] font-black uppercase tracking-tighter`}
              >
                {report.status}
              </ThemedText>
            </View>
          </View>

          <View className="flex-row items-center mt-1">
            <ThemedIcon
              name="location-outline"
              size={14}
              className="opacity-50"
            />
            <ThemedText className="text-muted-foreground text-xs ml-1 font-medium">
              {report.location}
            </ThemedText>
          </View>

          <View className="flex-row items-center mt-2">
            <ThemedText className="text-[10px] text-muted-foreground/60 font-bold">
              SUBMITTED: {report.date}
            </ThemedText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Reports;
