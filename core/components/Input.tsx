import { useController } from 'react-hook-form';
import { Text, TextInput, TextInputProps, View } from 'react-native';

interface CustomInputProps extends TextInputProps {
  label?: string;
  name: string;
  control: any; // Replace with the actual type of your control
}

export function Input(props: CustomInputProps): React.JSX.Element {
  const { control, label, name, ...otherProps } = props;
  const { field } = useController({
    control,
    defaultValue: '',
    name,
  });

  return (
    <View>
      <Text className="mb-2 font-semibold">{label}</Text>
      <View className="rounded-lg border border-gray-300 px-2 py-1">
        <TextInput 
          {...otherProps} 
          autoCapitalize="none" 
          className="ml-2 rounded-lg text-base" 
          onChangeText={field.onChange}
          value={field.value}
        />
      </View>
    </View>
  )
}