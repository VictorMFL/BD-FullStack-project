import { Product } from "../../../models/product";

export interface GetProductRepositoryProps {
  getProduct(id: string): Promise<Product>;
}
