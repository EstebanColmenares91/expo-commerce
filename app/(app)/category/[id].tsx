import useData from 'core/hooks/useData';
import { getCategoryById, getProductsByCategoryId } from 'core/services/categories.service';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { FlatList, Text, TouchableOpacity, View, Image } from 'react-native';

export default function ProductsByCategoryPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data: productsByCategory } = useData({
    key: id ? `/categories/${id}/products` : null,
    fetcher: () => getProductsByCategoryId(Number(id)),
  });

  const { data: category } = useData({
    key: id ? `/categories/${id}` : null,
    fetcher: () => getCategoryById(Number(id)),
  });

  return (
    <>
      <Stack.Screen options={{ headerTitle: category?.name ?? '' }} />
      <FlatList
        data={productsByCategory}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => {
          const firstImage = item.images[0];
          return (
            <TouchableOpacity
              className="m-2 flex-1 overflow-hidden rounded-lg bg-white shadow-sm"
              onPress={() => router.push(`/products/${item.id}`)}>
              <Image source={{ uri: firstImage }} className="h-64 rounded-lg" resizeMode="cover" />
              <View className="p-3">
                <View className="flex-row items-start justify-between">
                  <Text numberOfLines={1} className="flex-1 text-base font-semibold text-gray-800">
                    {item.title}
                  </Text>
                </View>
                <Text className="mt-1 text-lg font-bold text-primary-600">
                  ${item.price.toFixed(2)}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
}
