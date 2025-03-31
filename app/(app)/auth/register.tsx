import { Input } from 'core/components/Input';
import { useForm } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react-native';
import { RegisterFormValues } from 'modules/auth/models/auth.model';
import { emailAvailability } from 'modules/auth/services/auth.service';

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
      <View className="flex-1 bg-gray-50">
        <View className="bg-white px-4 pb-4 pt-12 shadow-sm">
          <Text className="text-2xl font-bold text-gray-800">Email's availability</Text>
        </View>

        <View className="p-4">
          <View className="rounded-lg bg-white p-6 shadow-sm">
            <View className="mb-4">
              <Text className="mb-2 text-gray-700">Email</Text>
              <View className="flex-row items-center rounded-lg border border-gray-300 px-4 py-2">
                <Mail size={20} color="#6b7280" />
                <Input
                  containerStyle="flex-1 flex-row"
                  control={emailAvailabilityControl}
                  inputContainerStyle="w-full border-0 p-0"
                  name="email"
                  placeholder="Type an email..."
                />
              </View>
            </View>

            <TouchableOpacity className="rounded-lg bg-primary-500 py-3" onPress={onSubmit}>
              <Text className="text-center text-lg font-semibold text-white">
                Check email's availability
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="mt-4">
              <Text className="text-center text-primary-600">
                Do you already have an account? Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="flex-1 bg-gray-50">
        <View className="bg-white px-4 pb-4 pt-12 shadow-sm">
          <Text className="text-2xl font-bold text-gray-800">Sign In</Text>
        </View>

        <View className="p-4">
          <View className="rounded-lg bg-white p-6 shadow-sm">
            <View className="mb-4">
              <Text className="mb-2 text-gray-700">Email</Text>
              <View className="flex-row items-center rounded-lg border border-gray-300 px-4 py-2">
                <User size={20} color="#6b7280" />
                <Input
                  containerStyle="flex-1 flex-row"
                  control={registerControl}
                  inputContainerStyle="w-full border-0 p-0"
                  name="name"
                  placeholder="Type an username..."
                />
              </View>
            </View>
            <View className="mb-4">
              <Text className="mb-2 text-gray-700">Email</Text>
              <View className="flex-row items-center rounded-lg border border-gray-300 px-4 py-2">
                <Mail size={20} color="#6b7280" />
                <Input
                  containerStyle="flex-1 flex-row"
                  control={registerControl}
                  inputContainerStyle="w-full border-0 p-0"
                  name="email"
                  placeholder="Type an email..."
                />
              </View>
            </View>
            <View className="mb-4">
              <Text className="mb-2 text-gray-700">Email</Text>
              <View className="flex-row items-center rounded-lg border border-gray-300 px-4 py-2">
                <Lock size={20} color="#6b7280" />
                <Input
                  containerStyle="flex-1 flex-row"
                  control={registerControl}
                  inputContainerStyle="w-full border-0 p-0"
                  name="password"
                  placeholder="Type a password..."
                />
              </View>
            </View>

            <TouchableOpacity className="rounded-lg bg-primary-500 py-3" onPress={onSubmit}>
              <Text className="text-center text-lg font-semibold text-white">Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity className="mt-4">
              <Text className="text-center text-primary-600">
                Do you already have an account? Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}
