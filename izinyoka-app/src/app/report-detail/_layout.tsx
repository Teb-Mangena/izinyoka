import { Colors } from '@/src/constants/Colors';
import { Stack } from 'expo-router'
import { useColorScheme } from 'react-native';

const ReportDetailLayout = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme ? Colors[colorScheme] : Colors.light;

  return (
    <Stack screenOptions={{
      title:"Report Details & AI Feedback",
      headerStyle: {
        backgroundColor: theme.background,
      },
      headerTintColor: theme.text
    }} />
  )
}

export default ReportDetailLayout