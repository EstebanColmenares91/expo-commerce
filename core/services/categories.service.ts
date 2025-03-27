import { Category } from 'core/models/category.model';
import { Product } from 'core/models/product.model';

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/api/v1/categories`;

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}

export async function getCategoryById(id: Category['id']): Promise<Category> {
  const response = await fetch(`${API_URL}/${id}`);
  const data = await response.json();
  return data;
}

export async function getProductsByCategoryId(id: Category['id']): Promise<Product[]> {
  const response = await fetch(`${API_URL}/${id}/products`);
  const data = await response.json();
  return data;
}
