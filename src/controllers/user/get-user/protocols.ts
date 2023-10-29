import { User } from "../../../models/user";

export interface GetUserRepositoryProps {
  getUser(id: string): Promise<User>;
}
