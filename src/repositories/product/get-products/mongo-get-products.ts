import { GetProductsRepositoryProps } from "../../../controllers/product/get-products/protocols";
import { MongoClient } from "../../../database/mongo";
import { Product } from "../../../models/product";
import { MongoProduct } from "../mongo-protocols";

export class MongoGetProductsRepository implements GetProductsRepositoryProps {
  async getProducts(): Promise<Product[]> {
    const products = await MongoClient.db
      .collection<MongoProduct>("products")
      .find({})
      .toArray();

    return products.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}