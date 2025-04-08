import { Category } from './category.model';

export interface Product {
  category: Category;
  creationAt: Date;
  description: string;
  id: number;
  images: string[];
  price: number;
  slug: string;
  title: string;
  updatedAt: Date;
}

export interface ProductWithQuantity extends Product {
  quantity: number;
}

export interface ProductPaginParams {
  limit?: number;
  offset?: number;
  price?: number;
  title?: string;
  price_min?: number;
  price_max?: number;
}
