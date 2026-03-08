import { Colors } from "@/src/constants/Colors";
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  useColorScheme,
} from "react-native";

type ThemedTextInputProps = TextInputProps & {
  style?: StyleProp<TextStyle>;
};

const ThemedTextInput = ({ style, ...props }: ThemedTextInputProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme ? Colors[colorScheme] : Colors.light;

  return (
    <TextInput
      style={[
        {
          backgroundColor: theme.uiBackground,
          padding: 20,
          color: theme.text,
        },
        style,
      ]}
      {...props}
    />
  );
};

export default ThemedTextInput;
