import { Colors } from "@/src/constants/Colors";
import {
  StyleProp,
  useColorScheme,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ThemedViewProps = ViewProps & {
  style?: StyleProp<ViewStyle>;
  safe?: boolean;
};

const ThemedView = ({ style, safe = false, ...props }: ThemedViewProps) => {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const theme = colorScheme ? Colors[colorScheme] : Colors.light;

  if (!safe)
    return (
      <View style={[{ backgroundColor: theme.background }, style]} {...props} />
    );

  return (
    <View
      style={[
        {
          backgroundColor: theme.background,
          paddingTop: insets.top + 2,
          // paddingBottom: insets.bottom
        },
        style,
      ]}
      {...props}
    />
  );
};

export default ThemedView;
