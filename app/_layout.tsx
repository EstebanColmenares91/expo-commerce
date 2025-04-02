import useData from 'core/hooks/useData';
import { initAxios } from 'core/interceptors/token.interceptor';
import { User } from 'core/models/user.model';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { getProfile } from 'modules/auth/services/auth.service';
import { SWRConfig } from 'swr';

initAxios();

export default function AppLayout(): React.JSX.Element {
  const {
    data: user,
    isLoading,
    error,
  } = useData<User>({ key: '/profile', fetcher: () => getProfile() });

  return (
    <SWRConfig>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="auto" />
    </SWRConfig>
  );
}
