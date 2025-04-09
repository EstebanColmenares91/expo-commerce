import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import { ProductWithQuantity } from 'core/models/product.model';
import { Order } from 'core/models/order.model';

interface State {
  orders: Record<string, Order>; // Keyed by order ID
  checkout: (userId: string, cartProducts: ProductWithQuantity[], total: number) => Order;
  getUserOrders: (userId: string) => Order[];
  getOrderById: (orderId: string) => Order | undefined;
  clearUserOrders: (userId: string) => void;
}

export const useOrdersStore = create<State>()(
  persist(
    (set, get) => ({
      orders: {},

      // Create a new order from cart contents
      checkout: (userId, cartProducts, total) => {
        const newOrder: Order = {
          id: uuidv4(),
          userId,
          timestamp: Date.now(),
          products: [...cartProducts], // Create a copy of the products
          total,
          status: 'pending',
        };

        set((state) => ({
          orders: {
            ...state.orders,
            [newOrder.id]: newOrder,
          },
        }));

        return newOrder;
      },

      // Get all orders for a specific user
      getUserOrders: (userId) => {
        return Object.values(get().orders)
          .filter((order) => order.userId === userId)
          .sort((a, b) => b.timestamp - a.timestamp); // Newest first
      },

      // Get a specific order by ID
      getOrderById: (orderId) => {
        return get().orders[orderId];
      },

      // Clear all orders for a user (e.g., on logout)
      clearUserOrders: (userId) => {
        set((state) => ({
          orders: Object.fromEntries(
            Object.entries(state.orders).filter(([_, order]) => order.userId !== userId)
          ),
        }));
      },
    }),
    {
      name: 'orders-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
