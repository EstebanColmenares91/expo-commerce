import { ProductWithQuantity } from './product.model';

export interface Order {
  id: string; // UUID
  userId: string; // Linked user ID
  timestamp: number; // Checkout time
  total: number;
  products: ProductWithQuantity[]; // All products from cart
  status?: 'pending' | 'completed' | 'cancelled'; // Optional status
}
