import { Dimensions, View } from "react-native";
import ThemedIcon from "./themes/ThemedIcon";
import ThemedText from "./themes/ThemedText";

type TipCardProps = { 
  title: string; 
  desc: string;  
  icon: any;
  color: string; 
}

const TipCard = ({ title, desc, icon, color }:TipCardProps) => {
  const { width } = Dimensions.get("window");

  return (
  <View
    style={{ width: width * 0.7, backgroundColor: "rgba(148, 163, 184, 0.05)" }}
    className="mr-4 p-5 rounded-3xl border border-primary/5"
  >
    <View
      style={{ backgroundColor: `${color}20` }}
      className="w-10 h-10 rounded-xl items-center justify-center mb-3"
    >
      <ThemedIcon name={icon} size={20} />
    </View>
    <ThemedText className="font-bold text-lg mb-1">{title}</ThemedText>
    <ThemedText className="text-muted-foreground text-sm leading-5">
      {desc}
    </ThemedText>
  </View>
)
};

export default TipCard;