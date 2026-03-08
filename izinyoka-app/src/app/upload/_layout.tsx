import { Stack } from "expo-router";

const UploadLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
        title:'Upload Reports'
      }} />
    </Stack>
  );
};

export default UploadLayout;
