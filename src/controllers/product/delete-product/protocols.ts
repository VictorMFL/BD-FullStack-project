import { Product } from "../../../models/product";

export interface DeleteProductRepositoryProps {
  deleteProduct(id: string): Promise<Product>;
}
