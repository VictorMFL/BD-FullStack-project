import { ObjectId } from "mongodb";
import { DeleteUserRepositoryProps } from "../../../controllers/user/delete-user/protocols";
import { MongoClient } from "../../../database/mongo";
import { User } from "../../../models/user";
import { MongoUser } from "../mongo-protocols";

export class MongoDeleteUserRepository implements DeleteUserRepositoryProps {
  async deleteUser(id: string): Promise<User> {
    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error("User not found");
    }

    const { deletedCount } = await MongoClient.db
      .collection("users")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      throw new Error("User not deleted");
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}