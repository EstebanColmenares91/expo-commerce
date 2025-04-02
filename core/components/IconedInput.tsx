import { View, TextInputProps } from 'react-native';
import { Input } from './Input';
import * as LucideIcons from 'lucide-react-native';
import { Label } from './Label';

type LucideIcon = React.ComponentType<{
  size?: number;
  color?: string;
  className?: string;
  [key: string]: any;
}>;

interface CustomInputProps extends TextInputProps {
  label: string;
  name: string;
  control: any;
  Icon: React.ReactNode;
}

export function IconedInput(props: CustomInputProps) {
  const { control, label, name, ...otherProps } = props;

  return (
    <View className="mb-4">
      <Label label={label} classname="text-gray-700" />
      <View className="flex-row items-center rounded-lg border border-gray-300 px-4 py-2">
        {/* <Mail size={20} color="#6b7280" /> */}
        {props.Icon}
        <Input control={props.control} name={props.name} {...otherProps} />
      </View>
    </View>
  );
}
