import { useSession } from 'core/context/UserContext';
import useData from 'core/hooks/useData';
import { User } from 'core/models/user.model';
import { Stack } from 'expo-router';
import { getProfile } from 'modules/auth/services/auth.service';
import { useEffect } from 'react';

export default function AppLayout(): React.JSX.Element {
  const { handleSignIn } = useSession();
  const { data: user, isLoading, error } = useData<User>({ key: '/profile', fetcher: getProfile });

  useEffect(() => {
    handleSignIn(user);
  }, [user]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
    </Stack>
  );
}
