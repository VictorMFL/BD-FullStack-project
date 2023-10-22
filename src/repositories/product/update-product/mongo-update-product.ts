import { ObjectId } from "mongodb";
import {
  UpdateProductParams,
  UpdateProductRepositoryProps,
} from "../../../controllers/product/update-product/protocols";
import { MongoClient } from "../../../database/mongo";
import { MongoProduct } from "../mongo-protocols";
import { Product } from "../../../models/product";

export class MongoUpdateProductRepository
  implements UpdateProductRepositoryProps
{
  async updateProduct(
    id: string,
    params: UpdateProductParams
  ): Promise<Product> {
    await MongoClient.db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...params,
        },
      }
    );

    const product = await MongoClient.db
      .collection<MongoProduct>("products")
      .findOne({ _id: new ObjectId(id) });

    if (!product) {
      throw new Error("Product not updated");
    }

    const { _id, ...rest } = product;

    return { id: _id.toHexString(), ...rest };
  }
}
