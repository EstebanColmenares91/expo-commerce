import { AuthProvider, useSession } from 'core/context/UserContext';
import useData from 'core/hooks/useData';
import { initAxios } from 'core/interceptors/token.interceptor';
import { User } from 'core/models/user.model';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { getProfile } from 'modules/auth/services/auth.service';
import { SWRConfig } from 'swr';

initAxios();

export default function AppLayout(): React.JSX.Element {
  return (
    <SWRConfig>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="auto" />
      </AuthProvider>
    </SWRConfig>
  );
}
