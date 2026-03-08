import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native'

const AccountSetting = () => {
  const { id } = useLocalSearchParams();

  return (
    <View className='flex-1'>
      <Text>AccountSetting - {id}</Text>
    </View>
  )
}

export default AccountSetting