import { useSession } from 'core/context/UserContext';
import { Stack, useRouter, useSegments } from 'expo-router';
import { isValidToken } from 'modules/auth/services/token.service';
import { useEffect } from 'react';

export default function AppLayout(): React.JSX.Element {
  const router = useRouter();
  const segments = useSegments();
  const { user: localUser, handleSignIn, handleSignOut } = useSession();

  useEffect(() => {
    isValidToken()
      .then((isValid) => {
        if (localUser) return;
        if (!localUser && isValid) return handleSignIn();
      })
      .catch(() => handleSignOut());
  }, []);

  useEffect(() => {
    const authRoute = segments.at(1) === 'auth';
    const profileRoute = segments.at(1) === 'profile';

    if (localUser && authRoute) {
      return router.replace('/');
    }

    if (!localUser && profileRoute) {
      return router.replace('/(app)/auth');
    }
  }, [localUser, segments]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="admin" options={{ headerShown: false }} />
      <Stack.Screen name="category" options={{ headerShown: false }} />
      <Stack.Screen name="products" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
    </Stack>
  );
}
