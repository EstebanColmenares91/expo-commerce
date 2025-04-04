import { useForm } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';
import { Mail, Lock } from 'lucide-react-native';
import { Link } from 'expo-router';
import { LoginFormValues } from 'modules/auth/models/auth.model';
import { IconedInput } from 'core/components/IconedInput';
import { login } from 'modules/auth/services/auth.service';
import { useSession } from 'core/context/UserContext';

export default function LoginPage() {
  const { handleSignIn } = useSession();
  const { control, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: {
      email: 'john@mail.com',
      password: 'changeme',
    },
  });

  const onSubmit = () => {
    handleSubmit((body: LoginFormValues) => {
      login(body)
        .then(() => handleSignIn())
        .catch((error) => console.log(error));
    })();
  };

  return (
    <View className="flex-1 justify-center bg-gray-50 p-4">
      <View className="rounded-lg bg-white p-4 shadow-sm">
        <View className="gap-4">
          <IconedInput
            className="text-gray-700"
            control={control}
            name="email"
            label="Email"
            Icon={<Mail size={20} color="#6b7280" />}
          />
          <IconedInput
            className="text-gray-700"
            control={control}
            name="password"
            label="Password"
            Icon={<Lock size={20} color="#6b7280" />}
          />

          <TouchableOpacity className="rounded-lg bg-primary-500 py-3" onPress={onSubmit}>
            <Text className="text-center text-lg font-semibold text-white">Sign In</Text>
          </TouchableOpacity>

          <Link href={'/auth/register'}>
            <Text className="text-center text-primary-600">Don't have an account? Sign up</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
