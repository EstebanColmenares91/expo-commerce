import { View, Text, Image, TouchableOpacity, FlatList, ListRenderItem } from 'react-native';
import { Package, Star } from 'lucide-react-native';
import { useOrdersStore } from 'core/store/orders';
import { Order } from 'core/models/order.model';
import { useSession } from 'core/context/UserContext';

const OrderStatus = ({ status }: { status: Order['status'] }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-blue-100 text-blue-700';
      case 'cancelled':
        return 'bg-red-100 text-white-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <View className={`rounded-full px-3 py-1 ${getStatusColor()}`}>
      <Text className="text-sm font-medium">{status}</Text>
    </View>
  );
};

export default function Orders() {
  const { user } = useSession();
  const { getUserOrders } = useOrdersStore();

  const userOrders = getUserOrders(user ? user?.id.toString() : '');

  const renderOrder: ListRenderItem<Order> = ({ item: order }) => (
    <TouchableOpacity
      className="mb-4 overflow-hidden rounded-lg bg-white shadow-sm"
      onPress={() => {}}>
      <View className="border-b border-gray-100 p-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-gray-600">Order #{order.id}</Text>
          <OrderStatus status={order.status} />
        </View>
        <Text className="mt-1 text-sm text-gray-500">
          Placed on {new Date(order.timestamp).toLocaleDateString()}
        </Text>
      </View>

      {order.products.map((item) => (
        <View key={item.id} className="flex-row items-center p-4">
          <Image
            source={{ uri: item.images[0] }}
            className="h-20 w-20 rounded-lg"
            resizeMode="cover"
          />
          <View className="ml-4 flex-1">
            <Text className="font-semibold text-gray-800" numberOfLines={2}>
              {item.title}
            </Text>
            <Text className="mt-1 text-gray-600">
              Qty: {item.quantity} × ${item.price.toFixed(2)}
            </Text>
          </View>
        </View>
      ))}

      <View className="flex-row items-center justify-between bg-gray-50 p-4">
        <View>
          <Text className="text-gray-600">Total Amount</Text>
          <Text className="text-lg font-bold text-gray-800">${order.total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity className="flex-row items-center rounded-lg bg-primary-500 px-4 py-2">
          <Star size={18} color="#fff" />
          <Text className="ml-2 font-semibold text-white">Rate Order</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <FlatList
        data={userOrders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        contentContainerClassName="p-4"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center p-4">
            <Package size={48} color="#9ca3af" />
            <Text className="mt-4 text-xl font-semibold text-gray-800">No orders yet</Text>
            <Text className="mt-2 text-center text-gray-600">
              Your order history will appear here
            </Text>
          </View>
        )}
      />
    </View>
  );
}
