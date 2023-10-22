import { ObjectId } from "mongodb";
import { DeleteProductRepositoryProps } from "../../../controllers/product/delete-product/protocols";
import { MongoClient } from "../../../database/mongo";
import { MongoProduct } from "../mongo-protocols";
import { Product } from "../../../models/product";

export class MongoDeleteProductRepository implements DeleteProductRepositoryProps {
  async deleteProduct(id: string): Promise<Product> {
    const product = await MongoClient.db
      .collection<MongoProduct>("products")
      .findOne({ _id: new ObjectId(id) });

    if (!product) {
      throw new Error("Product not found");
    }

    const { deletedCount } = await MongoClient.db
      .collection("products")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      throw new Error("Product not deleted");
    }

    const { _id, ...rest } = product;

    return { id: _id.toHexString(), ...rest };
  }
}
