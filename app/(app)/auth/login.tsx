import { Input } from 'core/components/Input';
import { useForm } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';
import { Mail, Lock } from 'lucide-react-native';
import { Link } from 'expo-router';
import { LoginFormValues } from 'modules/auth/models/auth.model';

export default function LoginPage() {
  const { control, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: {
      email: 'john@mail.com',
      password: 'changeme',
    },
  });

  const onSubmit = () => {
    handleSubmit((data: LoginFormValues) => {
      console.log(data);
    })();
  };

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-white px-4 pb-4 pt-12 shadow-sm">
        <Text className="text-2xl font-bold text-gray-800">Sign In</Text>
      </View>

      <View className="rounded-lg bg-white p-4 shadow-sm">
        <View className="gap-4">
          <View>
            <Text className="mb-2 text-gray-700">Email</Text>
            <View className="flex-row items-center rounded-lg border border-gray-300 px-4 py-2">
              <Mail size={20} color="#6b7280" />
              <Input
                className="ml-2 w-full flex-1 text-base"
                containerStyle="flex-1 flex-row"
                control={control}
                inputContainerStyle="border-0"
                name="email"
                placeholder="example@mail.com"
              />
            </View>
          </View>

          <View>
            <Text className="mb-2 text-gray-700">Password</Text>
            <View className="flex-row items-center rounded-lg border border-gray-300 px-4 py-2">
              <Lock size={20} color="#6b7280" />
              <Input
                className="p-0"
                containerStyle="flex-1 flex-row"
                control={control}
                inputContainerStyle="border-0"
                name="password"
                placeholder="*******"
              />
            </View>
          </View>

          <TouchableOpacity className="rounded-lg bg-primary-500 py-3" onPress={onSubmit}>
            <Text className="text-center text-lg font-semibold text-white">Sign In</Text>
          </TouchableOpacity>

          <Link href={''}>
            <Text className="text-center text-primary-600">Don't have an account? Sign up</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
