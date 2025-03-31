import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Minus, Plus, Trash2 } from 'lucide-react-native';

const SAMPLE_CART = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 199.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
  },
];

export default function ShoppingCartPage() {
  const renderCartItem = ({ item }) => (
    <View className="mb-4 flex-row rounded-lg bg-white p-4 shadow-sm">
      <Image source={{ uri: item.image }} className="h-24 w-24 rounded-lg" resizeMode="cover" />
      <View className="ml-4 flex-1">
        <Text className="text-lg font-semibold text-gray-800">{item.name}</Text>
        <Text className="mt-1 text-lg font-bold text-primary-600">${item.price.toFixed(2)}</Text>
        <View className="mt-2 flex-row items-center">
          <TouchableOpacity className="p-2">
            <Minus size={20} color="#6b7280" />
          </TouchableOpacity>
          <Text className="mx-4 text-lg">{item.quantity}</Text>
          <TouchableOpacity className="p-2">
            <Plus size={20} color="#6b7280" />
          </TouchableOpacity>
          <TouchableOpacity className="ml-auto p-2">
            <Trash2 size={20} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const total = SAMPLE_CART.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-white px-4 pb-4 pt-12 shadow-sm">
        <Text className="text-2xl font-bold text-gray-800">Shopping Cart</Text>
      </View>

      <FlatList
        data={SAMPLE_CART}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        contentContainerClassName="p-4"
      />

      <View className="shadow-t-sm bg-white p-4">
        <View className="mb-4 flex-row justify-between">
          <Text className="text-lg text-gray-600">Total</Text>
          <Text className="text-lg font-bold text-primary-600">${total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity className="rounded-lg bg-primary-500 py-4">
          <Text className="text-center text-lg font-semibold text-white">Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
