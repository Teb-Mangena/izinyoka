import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { JSX } from "react";

// Import your dedicated screens/components
import PersonalInfo from "@/src/components/screens/settings/PersonalInfoScreen";
import AlertPreferencesScreen from "@/src/components/screens/settings/AlertPreferencesScreen";
import PrivacySecurityScreen from "@/src/components/screens/settings/PrivacySecurityScreen";
import HotspotMapScreen from "@/src/components/screens/settings/HotspotMapScreen";
import SafetyGuidelinesScreen from "@/src/components/screens/settings/SafetyGuidelinesScreen";

const AccountSetting = () => {
  const { id } = useLocalSearchParams();

  // Map IDs to components
  const screens: Record<string, JSX.Element> = {
    acc_1: <PersonalInfo />,
    acc_2: <AlertPreferencesScreen />,
    acc_3: <PrivacySecurityScreen />,
    sup_1: <HotspotMapScreen />,
    sup_2: <SafetyGuidelinesScreen />,
  };

  const screen = screens[id as string];

  return (
    <View className="flex-1">
      {screen ? (
        screen
      ) : (
        <Text className="text-red-500 p-6">
          Unknown setting: {id}
        </Text>
      )}
    </View>
  );
};

export default AccountSetting;
