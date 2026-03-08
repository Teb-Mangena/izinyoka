import { Colors } from "@/src/constants/Colors";
import { ActivityIndicator, useColorScheme } from "react-native";

const ThemedLoader = ({
  size = "large",
}: {
  size?: number | "small" | "large";
}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme ? Colors[colorScheme] : Colors.light;

  return <ActivityIndicator size={size} color={theme.text} />;
};

export default ThemedLoader;
