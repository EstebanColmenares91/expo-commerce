import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { CreditCard, Truck, Shield, ChevronRight, Trash2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const SAMPLE_CART = {
  items: [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      price: 199.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    },
    {
      id: '2',
      name: 'Smart Watch Ultra Series 5',
      price: 299.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    },
  ],
  shipping: 9.99,
  tax: 45.0,
};

const PaymentMethod = ({ icon: Icon, label, selected, onSelect }) => (
  <TouchableOpacity
    onPress={onSelect}
    className={`mb-2 flex-row items-center rounded-lg border p-4 ${
      selected ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
    }`}>
    <Icon size={24} color={selected ? '#0ea5e9' : '#6b7280'} />
    <Text className={`ml-3 flex-1 ${selected ? 'text-primary-600' : 'text-gray-700'}`}>
      {label}
    </Text>
    <View
      className={`h-6 w-6 rounded-full border-2 ${
        selected ? 'border-primary-500' : 'border-gray-300'
      } items-center justify-center`}>
      {selected && <View className="h-3 w-3 rounded-full bg-primary-500" />}
    </View>
  </TouchableOpacity>
);

export default function Checkout() {
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState('credit-card');

  const subtotal = SAMPLE_CART.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {};

  const removeItem = (id: string) => {};

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Cart Items */}
      <View className="mt-2 bg-white">
        {SAMPLE_CART.items.map((item) => (
          <View key={item.id} className="flex-row border-b border-gray-100 p-4">
            <Image
              source={{ uri: item.image }}
              className="h-20 w-20 rounded-lg"
              resizeMode="cover"
            />
            <View className="ml-4 flex-1">
              <Text className="font-semibold text-gray-800" numberOfLines={2}>
                {item.name}
              </Text>
              <Text className="mt-1 font-bold text-primary-600">${item.price.toFixed(2)}</Text>
              <View className="mt-2 flex-row items-center justify-between">
                <Text className="text-gray-600">Qty: {item.quantity}</Text>
                <TouchableOpacity onPress={() => removeItem(item.id)} className="p-2">
                  <Trash2 size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Payment Methods */}
      <View className="mt-2 bg-white p-4">
        <Text className="mb-3 text-lg font-semibold">Payment Method</Text>
        <PaymentMethod
          icon={CreditCard}
          label="Credit Card"
          selected={selectedPayment === 'credit-card'}
          onSelect={() => setSelectedPayment('credit-card')}
        />
        <PaymentMethod
          icon={Shield}
          label="PayPal"
          selected={selectedPayment === 'paypal'}
          onSelect={() => setSelectedPayment('paypal')}
        />
      </View>

      {/* Shipping Info */}
      <TouchableOpacity
        className="mt-2 flex-row items-center justify-between bg-white p-4"
        onPress={() => router.push('/address')}>
        <View className="flex-1 flex-row items-center">
          <Truck size={24} color="#6b7280" />
          <View className="ml-3 flex-1">
            <Text className="font-semibold text-gray-800">Shipping Address</Text>
            <Text className="mt-1 text-gray-600" numberOfLines={1}>
              123 Main St, Apt 4B, New York, NY 10001
            </Text>
          </View>
        </View>
        <ChevronRight size={20} color="#9ca3af" />
      </TouchableOpacity>

      {/* Order Details */}
      <View className="mt-2 bg-white p-4">
        <Text className="mb-3 text-lg font-semibold">Order Details</Text>
        <View className="space-y-2">
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Subtotal</Text>
            <Text className="text-gray-800">${subtotal.toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Shipping</Text>
            <Text className="text-gray-800">${SAMPLE_CART.shipping.toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Tax</Text>
            <Text className="text-gray-800">${SAMPLE_CART.tax.toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between border-t border-gray-200 pt-2">
            <Text className="text-lg font-bold text-gray-800">Total</Text>
            <Text className="text-lg font-bold text-primary-600">${total.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      {/* Order Time */}
      <View className="mt-2 bg-white p-4">
        <Text className="text-gray-600">Order placed on {new Date().toLocaleString()}</Text>
      </View>

      {/* Checkout Button */}
      <View className="p-4">
        <TouchableOpacity onPress={handleCheckout} className="rounded-lg bg-primary-500 py-4">
          <Text className="text-center text-lg font-semibold text-white">
            Confirm Payment (${total.toFixed(2)})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Security Note */}
      <View className="items-center p-4 pb-8">
        <View className="flex-row items-center">
          <Shield size={16} color="#6b7280" />
          <Text className="ml-2 text-sm text-gray-500">Secure Payment Processing</Text>
        </View>
      </View>
    </ScrollView>
  );
}
