import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen name="orders" options={{ headerTitle: 'My Orders' }} />
      <Stack.Screen name="settings" options={{ headerTitle: 'Settings' }} />
      <Stack.Screen name="wishlist" options={{ headerTitle: 'Wishlist' }} />
    </Stack>
  );
}
