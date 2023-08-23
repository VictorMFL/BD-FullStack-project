import { User } from "../../models/user";

export interface UpdateUserParams {
  firstName?: string;
  lastName?: string;
  password?: string;
}

export interface UpdateUserRepositoryProps {
  updateUser(id: string, params: UpdateUserParams): Promise<User>;
}
