import { useController } from 'react-hook-form';
import { Text, TextInput, TextInputProps } from 'react-native';

interface CustomInputProps extends TextInputProps {
  label?: string;
  name: string;
  control: any;
}

export function Input(props: CustomInputProps): React.JSX.Element {
  const { control, label, name, ...otherProps } = props;
  const { field } = useController({
    control,
    defaultValue: '',
    name,
  });

  return (
    <>
      <Text className="mb-2 font-semibold">{label}</Text>
      <TextInput
        className="ml-2 flex-1 rounded-lg text-base"
        onChangeText={field.onChange}
        value={field.value}
        autoCapitalize="none"
        {...otherProps}
      />
    </>
  );
}
