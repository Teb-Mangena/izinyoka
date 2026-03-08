import { DimensionValue, View, ViewProps } from "react-native";

type SpacerProps = ViewProps & {
  width?: DimensionValue;
  height?: DimensionValue;
};

const Spacer = ({ width = "100%", height = 40, ...props }: SpacerProps) => {
  return <View style={{ width, height }} {...props} />;
};

export default Spacer;
