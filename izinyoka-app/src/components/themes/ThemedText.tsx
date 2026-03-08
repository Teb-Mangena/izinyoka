import { Colors } from "@/src/constants/Colors";
import {
  Platform,
  StyleProp,
  Text,
  TextProps,
  TextStyle,
  useColorScheme,
} from "react-native";

type ThemedTextProps = TextProps & {
  style?: StyleProp<TextStyle>;
  title?: boolean;
};

const ThemedText = ({ style, title = false, ...props }: ThemedTextProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme ? Colors[colorScheme] : Colors.light;

  const textColor = title ? theme.title : theme.text;

  const fontFamily = Platform.select({
    android: title ? "Poppins_700Bold" : "Poppins_400Regular",
    ios: title ? "Poppins-Bold" : "Poppins-Regular",
  });

  return <Text style={[{ color: textColor, fontFamily }, style]} {...props} />;
};

export default ThemedText;
