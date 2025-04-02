import { AuthProvider } from 'core/context/UserContext';
import { initAxios } from 'core/interceptors/token.interceptor';
import { Slot, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SWRConfig } from 'swr';

initAxios();

export default function AppLayout(): React.JSX.Element {
  return (
    <SWRConfig>
      <AuthProvider>
        <Slot />
        <StatusBar style="auto" />
      </AuthProvider>
    </SWRConfig>
  );
}
