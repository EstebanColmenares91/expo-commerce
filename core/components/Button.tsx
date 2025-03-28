import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

type ButtonProps = {
  children: React.ReactNode;
} & TouchableOpacityProps;

export function Button(props: ButtonProps) {
  const { children, className, ...otherProps } = props;
  return (
    <TouchableOpacity
      className={`flex-1 rounded-lg bg-primary-500 py-3 ${className}`}
      onPress={props.onPress}
      {...otherProps}>
      {children}
    </TouchableOpacity>
  );
}
