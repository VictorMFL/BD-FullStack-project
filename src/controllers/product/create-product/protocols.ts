import { Product } from "../../../models/product";

export interface CreateProductParams {
  title: string;
  discount?: number;
  quantity: number;
  category: string;
  catalog?: boolean;
  price: number;
  imageUrl: string;
}

export interface CreateProductRepositoryProps {
  createProduct(params: CreateProductParams): Promise<Product>;
}
