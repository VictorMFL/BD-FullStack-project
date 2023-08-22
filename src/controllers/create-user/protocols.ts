import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface CreateUserControllerProps {
  handle(httpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User>>
}

export interface CreateUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface CreateUserRepositoryProps {
  createUser(params: CreateUserParams): Promise<User>;
}
