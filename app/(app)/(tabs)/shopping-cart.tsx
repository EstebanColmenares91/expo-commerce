import { View, Text, FlatList, Image, TouchableOpacity, ListRenderItem } from 'react-native';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import { useShoppingCartStore } from 'core/store/shopping-cart';
import { useMemo } from 'react';
import { ProductWithQuantity } from 'core/models/product.model';

export default function ShoppingCartPage() {
  const { cart, addToCart } = useShoppingCartStore();
  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  console.log(total);

  const renderCartItem: ListRenderItem<ProductWithQuantity> = ({ item }) => (
    <View className="mb-4 flex-row rounded-lg bg-white p-4 shadow-sm">
      <Image source={{ uri: item.images[0] }} className="h-24 w-24 rounded-lg" resizeMode="cover" />
      <View className="ml-4 flex-1">
        <Text className="text-lg font-semibold text-gray-800">{item.title}</Text>
        <Text className="mt-1 text-lg font-bold text-primary-600">${item.price.toFixed(2)}</Text>
        <View className="mt-2 flex-row items-center">
          <TouchableOpacity className="p-2" onPress={() => {}}>
            <Minus size={20} color="#6b7280" />
          </TouchableOpacity>
          <Text className="mx-4 text-lg">{item.quantity}</Text>
          <TouchableOpacity className="p-2" onPress={() => addToCart(item)}>
            <Plus size={20} color="#6b7280" />
          </TouchableOpacity>
          <TouchableOpacity className="ml-auto p-2" onPress={() => {}}>
            <Trash2 size={20} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
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
