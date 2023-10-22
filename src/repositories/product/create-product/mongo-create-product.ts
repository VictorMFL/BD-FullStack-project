import {
  CreateProductParams,
  CreateProductRepositoryProps,
} from "../../../controllers/product/create-product/protocols";
import { MongoClient } from "../../../database/mongo";
import { Product } from "../../../models/product";
import { MongoProduct } from "../mongo-protocols";

export class MongoCreateProductRepository
  implements CreateProductRepositoryProps
{
  async createProduct(params: CreateProductParams): Promise<Product> {
    const { insertedId } = await MongoClient.db
      .collection("products")
      .insertOne(params);

    const product = await MongoClient.db
      .collection<MongoProduct>("products")
      .findOne({ _id: insertedId });

    if (!product) {
      throw new Error("User not created");
    }

    const { _id, ...rest } = product;

    return { id: _id.toHexString(), ...rest };
  }
}
