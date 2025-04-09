import { Stack } from 'expo-router';

export default function ProductsLayout() {
  return (
    <Stack>
      <Stack.Screen name="checkout" options={{ headerTitle: 'Order Summary' }} />
    </Stack>
  );
}
