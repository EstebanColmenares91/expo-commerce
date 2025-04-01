import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function ProfilePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <View className="flex-1 bg-gray-50">
      <View className="p-4">
        <View className="rounded-lg bg-white p-6 shadow-sm">
          <Text className="text-lg font-semibold text-gray-800">Welcome!</Text>
          <TouchableOpacity
            className="mt-4 rounded-lg bg-red-500 py-3"
            onPress={() => setIsAuthenticated(false)}>
            <Text className="text-center font-semibold text-white">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
