import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProductWithQuantity } from 'core/models/product.model';

interface CartState {
  cart: ProductWithQuantity[];
  addToCart: (product: Omit<ProductWithQuantity, 'quantity'>) => void;
  removeFromCart: (productId: string | number) => void;
  updateQuantity: (productId: string | number, newQuantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getProductQuantity: (productId: string | number) => number; // New method
}

export const useShoppingCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        set((state) => {
          const existingProduct = state.cart.find((p) => p.id === product.id);

          if (existingProduct) {
            return {
              cart: state.cart.map((p) =>
                p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
              ),
            };
          } else {
            return {
              cart: [...state.cart, { ...product, quantity: 1 }],
            };
          }
        });
      },

      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((product) => product.id !== productId),
        }));
      },

      updateQuantity: (productId, newQuantity) => {
        if (newQuantity < 1) {
          get().removeFromCart(productId);
          return;
        }

        set((state) => ({
          cart: state.cart.map((product) =>
            product.id === productId ? { ...product, quantity: newQuantity } : product
          ),
        }));
      },

      clearCart: () => {
        set({ cart: [] });
      },

      getTotalItems: () => {
        return get().cart.reduce((total, product) => total + product.quantity, 0);
      },

      getTotalPrice: () => {
        return get().cart.reduce((total, product) => total + product.price * product.quantity, 0);
      },

      getProductQuantity: (productId) => {
        const product = get().cart.find((p) => p.id === productId);
        return product ? product.quantity : 0;
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
