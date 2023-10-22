import { Product } from "../../../models/product";

export interface UpdateProductParams {
  title?: string;
  discount?: number;
  quantity?: number;
  catalog?: boolean;
  price?: number;
}

export interface UpdateProductRepositoryProps {
  updateProduct(id: string, params: UpdateProductParams): Promise<Product>;
}
