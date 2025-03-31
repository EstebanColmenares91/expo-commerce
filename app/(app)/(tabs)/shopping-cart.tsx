import { Text, View } from "react-native";

export default function ShoppingCartPage() {
    return (
        <View className="flex-1 items-center justify-center bg-gray-50">
            <Text className="text-2xl font-bold">Shopping Cart</Text>
            <Text className="text-lg">This is the shopping page.</Text>
        </View>
    );
}