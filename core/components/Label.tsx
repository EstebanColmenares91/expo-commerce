import { Text, ViewProps } from 'react-native';

export function Label({
  label,
  classname,
}: {
  label: string;
  classname: ViewProps['className'];
}): React.JSX.Element {
  return <Text className={`mb-2 font-semibold ${classname}`}>{label}</Text>;
}
