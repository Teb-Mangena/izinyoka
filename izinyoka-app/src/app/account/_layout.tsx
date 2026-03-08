import { Stack } from 'expo-router'

const AccountSettingsLayout = () => {
  return (
    <Stack>
      <Stack.Screen 
        name='[id]' 
        options={{
          title:'Account Information'
        }} 
      />
    </Stack>
  )
}

export default AccountSettingsLayout