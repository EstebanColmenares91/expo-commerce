import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProductWithQuantity } from 'core/models/product.model';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface State {
  userWishlists: Record<string, ProductWithQuantity[]>; // Keyed by user ID
  toggleWishlistItem: (userId: string, product: ProductWithQuantity) => void;
  isInWishlist: (userId: string, productId: string | number) => boolean;
  getWishlist: (userId: string) => ProductWithQuantity[];
}

export const useWishlistStore = create<State>()(
  persist(
    (set, get) => ({
      userWishlists: {},

      toggleWishlistItem: (userId, product) => {
        set((state) => {
          const userWishlist = state.userWishlists[userId] || [];
          const isAlreadyInWishlist = userWishlist.some((item) => item.id === product.id);

          if (isAlreadyInWishlist) {
            return {
              userWishlists: {
                ...state.userWishlists,
                [userId]: userWishlist.filter((item) => item.id !== product.id),
              },
            };
          } else {
            return {
              userWishlists: {
                ...state.userWishlists,
                [userId]: [...userWishlist, product],
              },
            };
          }
        });
      },

      isInWishlist: (userId, productId) => {
        const userWishlist = get().userWishlists[userId] || [];
        return userWishlist.some((item) => item.id === productId);
      },

      getWishlist: (userId) => {
        return get().userWishlists[userId] || [];
      },
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
