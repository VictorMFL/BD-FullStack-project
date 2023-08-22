import { User } from "../../models/user";

export interface DeleteUserRepositoryProps {
  deleteUser(id: string): Promise<User>
}
