import { Colors } from "@/src/constants/Colors";
import {
  StyleProp,
  StyleSheet,
  useColorScheme,
  View,
  ViewProps,
} from "react-native";

type ThemedCardProps = ViewProps & {
  style?: StyleProp<ViewProps>;
};

const ThemedCard = ({ style, ...props }: ThemedCardProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme ? Colors[colorScheme] : Colors.light;

  return (
    <View
      style={[
        {
          backgroundColor: theme.uiBackground,
        },
        styles.card,
        style,
      ]}
      {...props}
    />
  );
};

export default ThemedCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    padding: 20,
  },
});
