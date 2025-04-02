import { Input } from 'core/components/Input';
import { useForm } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react-native';
import { RegisterFormValues } from 'modules/auth/models/auth.model';
import { emailAvailability } from 'modules/auth/services/auth.service';
import { Link } from 'expo-router';
import { IconedInput } from 'core/components/IconedInput';

export default function RegisterPage() {
  const [isEmailAvailability, setIsEmailAvailability] = useState<boolean>(false);
  const { control: emailAvailabilityControl, handleSubmit: submitEmail } =
    useForm<RegisterFormValues>({
      defaultValues: {
        email: 'john@mail.com',
      },
    });

  const { control: registerControl, handleSubmit: submitRegistration } =
    useForm<RegisterFormValues>({
      defaultValues: {
        name: '',
        email: 'john@mail.com',
        password: 'changeme',
        avatar: '',
      },
    });

  const onSubmit = () => {
    submitEmail(async (data: RegisterFormValues) => {
      const { isAvailable } = await emailAvailability(data);
      setIsEmailAvailability(() => isAvailable);
    });
  };

  return (
    <>
      <View className="flex-1 justify-center bg-gray-50">
        <View className="p-4">
          <View className="rounded-lg bg-white p-6 shadow-sm">
            <IconedInput
              label="Email"
              control={emailAvailabilityControl}
              name="email"
              Icon={<Mail size={20} color="#6b7280" />}
            />

            <TouchableOpacity className="rounded-lg bg-primary-500 py-3" onPress={onSubmit}>
              <Text className="text-center text-lg font-semibold text-white">
                Check email's availability
              </Text>
            </TouchableOpacity>

            <Link className="mt-4" href={'/auth/login'}>
              <Text className="text-center text-primary-600">
                Do you already have an account? Sign in
              </Text>
            </Link>
          </View>
        </View>
      </View>
    </>
  );
}
