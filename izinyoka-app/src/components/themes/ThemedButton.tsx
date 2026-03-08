import { Colors } from "@/src/constants/Colors";
import {
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  useColorScheme,
} from "react-native";

type ThemedButtonProps = TouchableOpacityProps & {
  style?: StyleProp<TouchableOpacityProps>;
};

const ThemedButton = ({ style, ...props }: ThemedButtonProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme ? Colors[colorScheme] : Colors.light;

  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: theme.uiBackground,
          padding: 20,
        },
        style,
      ]}
      {...props}
    />
  );
};

export default ThemedButton;
