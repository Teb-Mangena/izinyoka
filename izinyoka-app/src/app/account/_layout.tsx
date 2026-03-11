import { Colors } from '@/src/constants/Colors';
import { Stack } from 'expo-router'
import { useColorScheme } from 'react-native';

const AccountSettingsLayout = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme ? Colors[colorScheme] : Colors.light;

  return (
    <Stack screenOptions={{
      headerStyle: {
        backgroundColor: theme.background,
      },
      headerTintColor: theme.text
    }}>
      <Stack.Screen 
        name='[id]' 
        options={{
          title:'Account Information',
        }} 
      />
    </Stack>
  )
}

export default AccountSettingsLayout