import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Package, ChevronRight, Star } from 'lucide-react-native';
import { useState } from 'react';

// Sample orders data - in a real app, this would come from your backend
const SAMPLE_ORDERS = [
  {
    id: 'ORD001',
    date: '2024-02-15',
    status: 'Delivered',
    total: 199.99,
    items: [
      {
        id: '1',
        name: 'Premium Wireless Headphones',
        price: 199.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      },
    ],
  },
  {
    id: 'ORD002',
    date: '2024-02-10',
    status: 'In Transit',
    total: 599.98,
    items: [
      {
        id: '2',
        name: 'Smart Watch Ultra Series 5',
        price: 299.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
      },
    ],
  },
];

const OrderStatus = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-700';
      case 'In Transit':
        return 'bg-blue-100 text-blue-700';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-700';
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
  const [orders] = useState(SAMPLE_ORDERS);

  const renderOrder = ({ item: order }) => (
    <TouchableOpacity
      className="mb-4 overflow-hidden rounded-lg bg-white shadow-sm"
      onPress={() => {}}>
      <View className="border-b border-gray-100 p-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-gray-600">Order #{order.id}</Text>
          <OrderStatus status={order.status} />
        </View>
        <Text className="mt-1 text-sm text-gray-500">
          Placed on {new Date(order.date).toLocaleDateString()}
        </Text>
      </View>

      {order.items.map((item) => (
        <View key={item.id} className="flex-row items-center p-4">
          <Image source={{ uri: item.image }} className="h-20 w-20 rounded-lg" resizeMode="cover" />
          <View className="ml-4 flex-1">
            <Text className="font-semibold text-gray-800" numberOfLines={2}>
              {item.name}
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
      <View className="bg-white px-4 pb-4 pt-12 shadow-sm">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-gray-800">My Orders</Text>
            <Text className="mt-1 text-gray-600">
              {orders.length} {orders.length === 1 ? 'order' : 'orders'}
            </Text>
          </View>
          <Package size={24} color="#4b5563" />
        </View>
      </View>

      {orders.length > 0 ? (
        <FlatList
          data={orders}
          renderItem={renderOrder}
          keyExtractor={(item) => item.id}
          contentContainerClassName="p-4"
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="flex-1 items-center justify-center p-4">
          <Package size={48} color="#9ca3af" />
          <Text className="mt-4 text-xl font-semibold text-gray-800">No orders yet</Text>
          <Text className="mt-2 text-center text-gray-600">
            Your order history will appear here
          </Text>
        </View>
      )}
    </View>
  );
}
