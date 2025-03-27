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
