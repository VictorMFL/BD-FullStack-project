import { GetUsersRepositoryProps } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements GetUsersRepositoryProps {
  async getUsers(): Promise<User[]> {
    return [{
      firstName: "Victor",
      lastName: "Laurentino",
      email: "vm859222@gmail.com",
      password: "12345678"
    }]
  }
   
}