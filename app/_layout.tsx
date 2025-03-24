import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SWRConfig } from 'swr';

export default function AppLayout(): React.JSX.Element {
  return (
    <SWRConfig>
      <Stack />
      <StatusBar style="auto" />
    </SWRConfig>
  );
}
