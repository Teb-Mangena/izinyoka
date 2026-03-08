import UserOnly from "@/src/components/auth/UserOnly";
import { Colors } from "@/src/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

const TabLayout = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme ? Colors[colorScheme] : Colors.light;

  return (
    <UserOnly>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.uiBackground,
          },
          headerTitleStyle: {
            color: theme.title,
          },
          tabBarActiveTintColor: theme.iconColorFocused,
          tabBarInactiveTintColor: theme.iconColor,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Uploads",
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="reports"
          options={{
            title: "Reports",
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "analytics" : "analytics-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "person-circle" : "person-circle-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </UserOnly>
  );
};

export default TabLayout;
