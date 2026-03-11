import { Colors } from "@/src/constants/Colors";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

const UploadLayout = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme ? Colors[colorScheme] : Colors.light;

  return (
    <Stack screenOptions={{
      headerStyle: {
        backgroundColor: theme.background,
      },
      headerTintColor: theme.text
    }}>
      <Stack.Screen name="index" options={{
        title:'Upload Reports'
      }} />
    </Stack>
  );
};

export default UploadLayout;
