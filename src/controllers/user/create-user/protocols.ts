import { User } from "../../../models/user";

export interface CreateUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface CreateUserRepositoryProps {
  createUser(params: CreateUserParams): Promise<User>;
}
