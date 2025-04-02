import { Stack } from 'expo-router';

export default function AuthLayou() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerTitle: 'Sign In' }} />
      <Stack.Screen name="register" options={{ headerTitle: 'Sign Up' }} />
    </Stack>
  );
}
