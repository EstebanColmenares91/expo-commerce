import LikeButton from 'core/components/LikeButton';
import { useSession } from 'core/context/UserContext';
import useData from 'core/hooks/useData';
import { getProduct } from 'core/services/products.service';
import { useShoppingCartStore } from 'core/store/shopping-cart';
import { useWishlistStore } from 'core/store/wishlist';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ShoppingCart, X } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export default function ProductDetailPage() {
  const { user } = useSession();
  const { userWishlists, isInWishlist } = useWishlistStore();
  const { addToCart, getProductQuantity } = useShoppingCartStore();
  const { id } = useLocalSearchParams();

  const { data: product, isLoading } = useData({
    key: id ? `/products/${id}` : null,
    fetcher: () => getProduct(Number(id)),
  });
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openCarousel = useCallback((index: number) => {
    setSelectedImageIndex(index);
  }, []);

  const closeCarousel = useCallback(() => {
    setSelectedImageIndex(null);
  }, []);

  if (!isLoading && !product) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-xl">Product not found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: product?.title,
        }}
      />
      <View className="flex-1 bg-white">
        <ScrollView className="flex-1">
          {/* Bento Grid */}
          <View className="flex-row flex-wrap px-2">
            {product?.images.map((image, index) => (
              <TouchableOpacity
                key={index}
                className={`p-1 ${index === 0 ? 'h-64 w-full' : 'aspect-square w-1/3'}`}
                onPress={() => openCarousel(index)}>
                <Image
                  source={{ uri: image }}
                  className="h-full w-full rounded-lg"
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Product Info */}
          <View className="p-4">
            <Text className="text-2xl font-bold text-gray-800">{product?.title}</Text>
            <View className="flex-row items-center justify-between">
              <Text className="mt-2 text-2xl font-bold text-primary-600">
                ${product?.price.toFixed(2)}
              </Text>
              <LikeButton />
            </View>
            <Text className="mt-4 text-gray-600">{product?.description}</Text>
          </View>
        </ScrollView>

        {/* Add to Cart Button */}
        {product && (
          <View className="border-t border-gray-200 p-4">
            <TouchableOpacity
              className="flex-row items-center justify-center rounded-lg bg-primary-500 p-4"
              onPress={() => addToCart(product)}>
              {getProductQuantity(product.id) > 0 ? (
                <Text className="ml-2 text-lg font-semibold text-white">
                  Add more: {getProductQuantity(product.id)}
                </Text>
              ) : (
                <Text className="ml-2 text-lg font-semibold text-white">Add to Cart</Text>
              )}
              <ShoppingCart size={20} color="#fff" className="mr-2" />
            </TouchableOpacity>
          </View>
        )}

        {/* Full Screen Carousel */}
        {selectedImageIndex !== null && (
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            className="absolute inset-0 h-screen bg-black"
            style={{
              width: windowWidth,
              height: windowHeight,
            }}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              contentOffset={{ x: selectedImageIndex, y: 0 }}>
              {product?.images.map((image, index) => (
                <View key={index} style={{ width: windowWidth, height: windowHeight }}>
                  <Image
                    source={{ uri: image }}
                    style={{ width: windowWidth, height: windowHeight }}
                    resizeMode="contain"
                  />
                </View>
              ))}
            </ScrollView>

            {/* Close Button */}
            <TouchableOpacity
              onPress={closeCarousel}
              className="absolute right-4 top-12 z-10 rounded-full bg-white/10 p-2">
              <X size={24} color="#fff" />
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </>
  );
}
