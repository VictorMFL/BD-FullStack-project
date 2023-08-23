import { User } from "../../models/user";

export interface GetUsersRepositoryProps {
  getUsers(): Promise<User[]>
}