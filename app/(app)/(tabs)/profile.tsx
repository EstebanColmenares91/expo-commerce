import { useSession } from 'core/context/UserContext';
import { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Heart, Package, WalletCardsIcon } from 'lucide-react-native';
import { Link } from 'expo-router';

interface MenuButtoms {
  name: string;
  route: string;
  Icon: React.ReactNode;
}

const MenuButtoms: MenuButtoms[] = [
  {
    name: 'Checkout',
    route: '',
    Icon: <WalletCardsIcon size={30} color={'red'} />,
  },
  {
    name: 'My Orders',
    route: '',
    Icon: <Package size={30} color={'red'} />,
  },
  {
    name: 'Wishlist',
    route: '',
    Icon: <Heart size={30} color={'red'} />,
  },
];

export default function ProfilePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user, handleSignOut } = useSession();

  // if (!user) {
  //   return (
  //     <View className="flex-1 bg-gray-50">
  //       <Link href={'auth/login'}>Ir a login</Link>
  //     </View>
  //   );
  // }

  return (
    <View className="flex-1 bg-gray-50">
      <View className="p-4">
        <View className="gap-4 rounded-lg bg-white p-6 shadow-sm">
          <Text className="text-center text-lg font-semibold text-gray-800">
            Welcome, {user?.name}!
          </Text>
          <Text className="text-center text-sm font-semibold text-gray-800">{user?.role}</Text>

          <TouchableOpacity
            className="m-auto w-1/2 rounded-full bg-primary-500 py-3"
            onPress={() => {}}>
            <Text className="text-center font-semibold text-white">Edit Profile</Text>
          </TouchableOpacity>

          <FlatList
            data={MenuButtoms}
            keyExtractor={(index) => index.toString()}
            numColumns={2}
            renderItem={({ index, item }) => (
              <TouchableOpacity
                className="m-2 flex-1 gap-2 overflow-hidden rounded-lg bg-white p-4 shadow-md"
                onPress={() => {}}>
                {item.Icon}
                <View>
                  <View className="flex-row items-start justify-between">
                    <Text
                      numberOfLines={1}
                      className="flex-1 text-base font-semibold text-gray-800">
                      {item.name}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity className="mt-4 rounded-lg bg-red-500 py-3" onPress={handleSignOut}>
            <Text className="text-center font-semibold text-white">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
