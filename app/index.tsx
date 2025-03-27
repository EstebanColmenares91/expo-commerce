import useData from 'core/hooks/useData';
import { getCategories } from 'core/services/categories.service';
import { useRouter } from 'expo-router';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { useState } from 'react';
import { FlatList, TextInput, TouchableOpacity, View, Text, Image } from 'react-native';
import '../global.css';

export default function App() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const { data: categories } = useData({ key: '/categories', fetcher: () => getCategories() });

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-white px-4 pb-4 pt-8 shadow-sm">
        <View className="flex-row items-center space-x-4">
          <View className="flex-1 flex-row items-center rounded-full bg-gray-100 px-4 py-2">
            <Search size={20} color="#6b7280" />
            <TextInput
              className="ml-2 flex-1 text-base"
              placeholder="Search products..."
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          <TouchableOpacity
            className={`rounded-full p-3 ${selectedBrands.length > 0 || selectedPriceRange !== null || selectedRating !== null ? 'bg-primary-500' : 'bg-gray-100'}`}
            onPress={() => setShowFilters(true)}>
            <SlidersHorizontal
              size={20}
              color={
                selectedBrands.length > 0 || selectedPriceRange !== null || selectedRating !== null
                  ? '#fff'
                  : '#6b7280'
              }
            />
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Text numberOfLines={1} className="flex-1 text-base font-semibold text-gray-800">
          Categories
        </Text>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="m-2 flex-1 overflow-hidden rounded-lg bg-white shadow-sm"
              onPress={() => router.push(`/product-detail/${item.id}`)}>
              <Image source={{ uri: item.image }} className="h-64 rounded-lg" resizeMode="cover" />
              <View className="p-3">
                <View className="flex-row items-start justify-between">
                  <Text numberOfLines={1} className="flex-1 text-base font-semibold text-gray-800">
                    {item.name}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
