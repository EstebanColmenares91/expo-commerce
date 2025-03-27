import { Product } from 'core/models/product.model';

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/api/v1/products`;

export async function getProduct(id: number): Promise<Product> {
  const response = await fetch(`${API_URL}/${id}`);
  const data = await response.json();
  return data;
}
