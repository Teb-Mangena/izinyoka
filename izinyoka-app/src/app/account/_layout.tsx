import { Stack } from 'expo-router'

const AccountSettingsLayout = () => {
  return (
    <Stack>
      <Stack.Screen 
        name='[id]' 
        options={{
        title:'Name'
        }} 
      />
    </Stack>
  )
}

export default AccountSettingsLayout