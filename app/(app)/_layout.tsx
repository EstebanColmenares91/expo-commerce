import { useSession } from 'core/context/UserContext';
import useData from 'core/hooks/useData';
import { User } from 'core/models/user.model';
import { Stack, useRouter, useSegments } from 'expo-router';
import { getProfile } from 'modules/auth/services/auth.service';
import { isValidToken } from 'modules/auth/services/token.service';
import { useEffect } from 'react';

export default function AppLayout(): React.JSX.Element {
  const router = useRouter();
  const segments = useSegments();
  const { handleSignIn, handleSignOut } = useSession();
  const { data: user, isLoading, error } = useData<User>({ key: '/profile', fetcher: getProfile });

  useEffect(() => {
    isValidToken()
      .then((isValid) => {
        if (isValid) handleSignIn(user);
      })
      .catch(() => handleSignOut);
  }, []);

  useEffect(() => {
    const authRoute = segments.at(1) === 'auth';
    if (user && authRoute) {
      router.replace('/');
    }
  }, [user, segments]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
    </Stack>
  );
}
