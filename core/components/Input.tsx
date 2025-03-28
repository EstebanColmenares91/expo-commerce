import { Text, TextInput, TextInputProps, View } from 'react-native';

type InputProps = { label?: string } & TextInputProps;

export function Input(props: InputProps): React.JSX.Element {
  return (
    <View>
      <Text className="mb-2 font-semibold">{props.label}</Text>
      <View className="rounded-lg border border-gray-300 px-2 py-1">
        <TextInput className="ml-2 rounded-lg text-base" autoCapitalize="none" {...props} />
      </View>
    </View>
  );
}
