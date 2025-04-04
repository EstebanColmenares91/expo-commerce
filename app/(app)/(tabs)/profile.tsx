import { useSession } from 'core/context/UserContext';
import { useState } from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
  LogOut,
  Heart,
  ShoppingBag,
  Settings,
  ChevronRight,
  CreditCard as Edit2,
} from 'lucide-react-native';
import { Link, useRouter } from 'expo-router';
import useProfile from 'core/hooks/useProfile';

interface MenuButtoms {
  name: string;
  route: string;
  Icon: React.ReactNode;
}

// const MenuButtoms: MenuButtoms[] = [
//   {
//     name: 'Checkout',
//     route: '',
//     Icon: <WalletCardsIcon size={30} color={'red'} />,
//   },
//   {
//     name: 'My Orders',
//     route: '',
//     Icon: <Package size={30} color={'red'} />,
//   },
//   {
//     name: 'Wishlist',
//     route: '',
//     Icon: <Heart size={30} color={'red'} />,
//   },
// ];

const MenuButton = ({ icon: Icon, label, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center justify-between border-b border-gray-100 bg-white p-4">
    <View className="flex-row items-center">
      <Icon size={20} color="#4b5563" />
      <Text className="ml-3 text-base text-gray-700">{label}</Text>
    </View>
    <ChevronRight size={20} color="#9ca3af" />
  </TouchableOpacity>
);

export default function ProfilePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user, handleSignOut } = useSession();

  if (user! == null) {
    return (
      <View className="flex-1 bg-gray-50">
        <View className="bg-white px-4 pb-4 pt-12">
          <Text className="text-2xl font-bold text-gray-800">Welcome</Text>
          <Text className="mt-1 text-gray-600">Sign in to access your profile</Text>
        </View>

        <View className="mt-4 p-4">
          <TouchableOpacity
            onPress={() => router.push('/auth/login')}
            className="mb-3 rounded-lg bg-primary-500 px-4 py-3">
            <Text className="text-center text-lg font-semibold text-white">Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/auth/register')}
            className="rounded-lg border border-gray-300 bg-white px-4 py-3">
            <Text className="text-center text-lg font-semibold text-gray-700">Create Account</Text>
          </TouchableOpacity>

          <View className="mt-8 items-center">
            <Text className="text-center text-gray-500">
              Sign in to access your orders, wishlist,{'\n'}and personalized recommendations
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="bg-white px-4 pb-6 pt-12">
        <View className="flex-row items-center">
          <Image source={{ uri: user?.avatar }} className="h-20 w-20 rounded-full" />
          <View className="ml-4 flex-1">
            <Text className="text-xl font-bold text-gray-800">{user?.name}</Text>
            <Text className="text-gray-600">{user?.email}</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/profile/edit')}
            className="rounded-full bg-gray-100 p-2">
            <Edit2 size={20} color="#4b5563" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="mt-4">
        <MenuButton
          icon={ShoppingBag}
          label="My Orders"
          onPress={() => router.push('/profile/orders')}
        />
        <MenuButton
          icon={Heart}
          label="Wishlist"
          onPress={() => router.push('/profile/wishlist')}
        />
        <MenuButton
          icon={Settings}
          label="Settings"
          onPress={() => router.push('/profile/settings')}
        />
      </View>

      <TouchableOpacity
        onPress={handleSignOut}
        className="mx-4 mt-6 flex-row items-center justify-center rounded-lg bg-red-50 px-4 py-3">
        <LogOut size={20} color="#ef4444" />
        <Text className="ml-2 text-base font-semibold text-red-500">Sign Out</Text>
      </TouchableOpacity>

      <View className="h-20" />
    </ScrollView>
  );
}
