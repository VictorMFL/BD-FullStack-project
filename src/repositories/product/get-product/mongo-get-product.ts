import { ObjectId } from "mongodb";
import { MongoClient } from "../../../database/mongo";
import { MongoProduct } from "../mongo-protocols";
import { Product } from "../../../models/product";
import { GetProductRepositoryProps } from "../../../controllers/product/get-product/protocols";

export class MongoGetProductRepository implements GetProductRepositoryProps {
  async getProduct(id: string): Promise<Product> {
    const product = await MongoClient.db
      .collection<MongoProduct>("products")
      .findOne({ _id: new ObjectId(id) });

    if (!product) {
      throw new Error("Product not found");
    }

    const { _id, ...rest } = product;

    return { id: _id.toHexString(), ...rest };
  }
}
