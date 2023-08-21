import { GetUsersRepositoryProps } from "../../controllers/get-users/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements GetUsersRepositoryProps {
  async getUsers(): Promise<User[]> {
    const users = await MongoClient.db.collection<User>('users').find({}).toArray()
    return [{
      id: "1",
      firstName: "Victor",
      lastName: "Laurentino",
      email: "vm859222@gmail.com",
      password: "12345678"
    }]
  }
   
}