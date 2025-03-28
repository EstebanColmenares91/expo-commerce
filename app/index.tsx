import { Button } from 'core/components/Button';
import { Input } from 'core/components/Input';
import useData from 'core/hooks/useData';
import { getCategories } from 'core/services/categories.service';
import { useRouter } from 'expo-router';
import { Search, SlidersHorizontal, X } from 'lucide-react-native';
import { useState } from 'react';
import { FlatList, TextInput, TouchableOpacity, View, Text, Image, Modal } from 'react-native';
import '../global.css';

export default function App() {
  const router = useRouter();
  const { data: categories } = useData({ key: '/categories', fetcher: () => getCategories() });

  const [showModal, setShowModal] = useState(false);
  // Params filters states
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  const handleFilters = () => {
    router.push(`/products`);
    router.setParams({ title });
    router.setParams({ price });
    router.setParams({ price_min: minPrice });
    router.setParams({ price_max: maxPrice });
  };

  const handleNullFilters = () => {
    setPrice('');
    setMinPrice('');
    setMaxPrice('');
  };

  return (
    <View className="flex-1 bg-gray-50">
      <Modal animationType="slide" visible={showModal}>
        <View className="gap-4 p-4">
          <TouchableOpacity className="items-end" onPress={() => setShowModal(() => false)}>
            <X size={24} color="black" className="self-center" />
          </TouchableOpacity>
          <Text className="text-center text-2xl font-bold">Filter your products!</Text>
          <View className="gap-4">
            <Input value={price} onChangeText={setPrice} placeholder="Set a price" label="Price" />
            <Input
              value={minPrice}
              onChangeText={setMinPrice}
              placeholder="Set a min price"
              label="Min price"
            />
            <Input
              value={maxPrice}
              onChangeText={setMaxPrice}
              placeholder="Set a max price"
              label="Max price"
            />
          </View>
          <View className="flex-row gap-2">
            <Button onPress={handleFilters}>
              <Text className="text-center font-semibold text-white">Apply filters</Text>
            </Button>
            <Button className="border border-gray-500 bg-white" onPress={handleNullFilters}>
              <Text className="text-center font-semibold">Clear filters</Text>
            </Button>
          </View>
        </View>
      </Modal>

      <View className="bg-white px-4 pb-4 pt-8 shadow-sm">
        <View className="flex-row items-center space-x-4">
          <View className="flex-1 flex-row items-center rounded-full bg-gray-100 px-4 py-2">
            <Search size={20} color="#6b7280" />
            <TextInput
              className="ml-2 flex-1 text-base"
              placeholder="Search products..."
              value={title}
              onChangeText={setTitle}
              onSubmitEditing={handleFilters}
            />
          </View>
          <TouchableOpacity
            className="rounded-full bg-primary-500 p-3"
            onPress={() => setShowModal((prevState) => !prevState)}>
            <SlidersHorizontal size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-1">
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
              onPress={() => router.push(`/category/${item.id}`)}>
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
