import useData from 'core/hooks/useData';
import { Product } from 'core/models/product.model';
import { getProducts } from 'core/services/products.service';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FlatList, ListRenderItem, TouchableOpacity, View, Image, Text } from 'react-native';

export default function Products() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { data: products } = useData({ key: '/products', fetcher: () => getProducts(params) });

  const renderProduct: ListRenderItem<Product> = ({ item }) => {
    const firstImage = item.images[0];
    return (
      <TouchableOpacity
        className="m-2 flex-1 overflow-hidden rounded-lg bg-white shadow-sm"
        onPress={() => router.push(`/product/${item.id}`)}>
        <Image source={{ uri: firstImage }} className="h-64 rounded-lg" resizeMode="cover" />
        <View className="p-3">
          <View className="flex-row items-start justify-between">
            <Text numberOfLines={1} className="flex-1 text-base font-semibold text-gray-800">
              {item.title}
            </Text>
          </View>
          <Text className="mt-1 text-lg font-bold text-primary-600">${item.price.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      renderItem={renderProduct}
    />
  );
}
