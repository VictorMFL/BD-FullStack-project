import { Product } from "../../../models/product";

export interface GetProductsRepositoryProps {
  getProducts(): Promise<Product[]>;
}