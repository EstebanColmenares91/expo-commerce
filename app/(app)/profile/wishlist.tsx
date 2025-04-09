import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Heart, Trash2, ShoppingCart } from 'lucide-react-native';
import { useState } from 'react';

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  const removeFromWishlist = (id: string) => {
    setWishlist((current) => current.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <View className="mb-4 overflow-hidden rounded-lg bg-white shadow-sm">
      <View className="flex-row">
        <Image source={{ uri: item.image }} className="h-32 w-32" resizeMode="cover" />
        <View className="flex-1 p-4">
          <Text className="text-lg font-semibold text-gray-800" numberOfLines={2}>
            {item.name}
          </Text>
          <Text className="mt-1 text-lg font-bold text-primary-600">${item.price.toFixed(2)}</Text>
          <Text className={`mt-1 ${item.inStock ? 'text-green-600' : 'text-red-500'}`}>
            {item.inStock ? 'In Stock' : 'Out of Stock'}
          </Text>

          <View className="mt-3 flex-row space-x-2">
            {item.inStock && (
              <TouchableOpacity
                className="flex-1 flex-row items-center justify-center rounded-lg bg-primary-500 px-4 py-2"
                onPress={() => {}}>
                <ShoppingCart size={18} color="#fff" />
                <Text className="ml-2 font-semibold text-white">Add to Cart</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              className="rounded-lg bg-red-50 p-2"
              onPress={() => removeFromWishlist(item.id)}>
              <Trash2 size={20} color="#ef4444" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <FlatList
        data={[]}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerClassName="p-4"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center p-4">
            <Heart size={48} color="#9ca3af" />
            <Text className="mt-4 text-xl font-semibold text-gray-800">Your wishlist is empty</Text>
            <Text className="mt-2 text-center text-gray-600">
              Save items you love and want to buy later
            </Text>
          </View>
        )}
      />
    </View>
  );
}
