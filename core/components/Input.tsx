import { useController } from 'react-hook-form';
import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

interface CustomInputProps extends TextInputProps {
  label?: string;
  name: string;
  control: any; // Replace with the actual type of your control
  containerStyle?: ViewProps['className'];
  inputContainerStyle?: ViewProps['className'];
}

export function Input(props: CustomInputProps): React.JSX.Element {
  const { control, label, name, ...otherProps } = props;
  const { field } = useController({
    control,
    defaultValue: '',
    name,
  });

  return (
    <View className={props.containerStyle}>
      <Text className="mb-2 font-semibold">{label}</Text>
      <View className={`rounded-lg border border-gray-300 ${props.inputContainerStyle}`}>
        <TextInput
          {...otherProps}
          autoCapitalize="none"
          className="ml-2 rounded-lg text-base"
          onChangeText={field.onChange}
          value={field.value}
        />
      </View>
    </View>
  );
}
