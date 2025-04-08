import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProductWithQuantity } from 'core/models/product.model';

interface CartState {
  cart: ProductWithQuantity[];
  addToCart: (product: Omit<ProductWithQuantity, 'quantity'>) => void;
  removeFromCart: (productId: string | number) => void;
  subtractFromCart: (productId: string | number) => void;
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

      subtractFromCart: (productId) => {
        set((state) => {
          const existingProduct = state.cart.find((p) => p.id === productId);

          if (!existingProduct) {
            return state; // Product not found, no changes
          }

          if (existingProduct.quantity <= 1) {
            // Remove product if quantity would become 0
            return {
              cart: state.cart.filter((product) => product.id !== productId),
            };
          } else {
            // Decrement quantity
            return {
              cart: state.cart.map((p) =>
                p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
              ),
            };
          }
        });
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
