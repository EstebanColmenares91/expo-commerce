import { Product, ProductPaginParams } from 'core/models/product.model';

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/api/v1/products`;

export async function getProduct(id: number): Promise<Product> {
  const response = await fetch(`${API_URL}/${id}`);
  const data = await response.json();
  return data;
}

export async function getProducts(params: ProductPaginParams = {}): Promise<Product[]> {
  const urlWithParams = new URL(API_URL);
  Object.keys(params).forEach((key) => urlWithParams.searchParams.append(key, params[key]));
  const response = await fetch(urlWithParams);
  const data = await response.json();
  return data;
}
