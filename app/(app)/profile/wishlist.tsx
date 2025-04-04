import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Heart, Trash2, ShoppingCart } from 'lucide-react-native';
import { useState } from 'react';

// Sample wishlist data - in a real app, this would come from your backend
const SAMPLE_WISHLIST = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    inStock: true,
  },
  {
    id: '2',
    name: 'Smart Watch Ultra Series 5',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    inStock: true,
  },
  {
    id: '3',
    name: 'Professional Camera Kit',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
    inStock: false,
  },
];

export default function Wishlist() {
  const [wishlist, setWishlist] = useState(SAMPLE_WISHLIST);

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
      <View className="bg-white px-4 pb-4 pt-12 shadow-sm">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-gray-800">Wishlist</Text>
            <Text className="mt-1 text-gray-600">
              {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
            </Text>
          </View>
          <Heart size={24} color="#ef4444" fill="#ef4444" />
        </View>
      </View>

      {wishlist.length > 0 ? (
        <FlatList
          data={wishlist}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerClassName="p-4"
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="flex-1 items-center justify-center p-4">
          <Heart size={48} color="#9ca3af" />
          <Text className="mt-4 text-xl font-semibold text-gray-800">Your wishlist is empty</Text>
          <Text className="mt-2 text-center text-gray-600">
            Save items you love and want to buy later
          </Text>
        </View>
      )}
    </View>
  );
}
