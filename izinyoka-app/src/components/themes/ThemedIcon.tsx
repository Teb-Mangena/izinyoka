import { Colors } from "@/src/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { useColorScheme } from "react-native";

type ThemedIconTypes = {
  name: ComponentProps<typeof Ionicons>["name"];
  size?: number;
} & Omit<ComponentProps<typeof Ionicons>, "name" | "size" | "color">;

const ThemedIcon = ({ name, size = 24, ...props }: ThemedIconTypes) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme ? Colors[colorScheme] : Colors.light;

  return (
    <Ionicons name={name} size={size} color={theme.iconColor} {...props} />
  );
};

export default ThemedIcon;
