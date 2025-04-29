import { StripeProvider } from '@stripe/stripe-react-native';
import { AuthProvider } from 'core/context/UserContext';
import { initAxios } from 'core/interceptors/token.interceptor';
import { Slot, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SWRConfig } from 'swr';

initAxios();

export default function AppLayout(): React.JSX.Element {
  return (
    <StripeProvider publishableKey={`${process.env.EXPO_PUBLIC_STRIPE}`}>
      <SWRConfig>
        <AuthProvider>
          <Slot />
          <StatusBar style="auto" />
        </AuthProvider>
      </SWRConfig>
    </StripeProvider>
  );
}
