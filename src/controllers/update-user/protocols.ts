import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface UpdateUserParams {
  firstName?: string;
  lastName?: string;
  password?: string;
}

export interface UpdateUserControllerProps {
  handle(httpRequest: HttpRequest<any>):Promise<HttpResponse<User>>
}

export interface UpdateUserRepositoryProps {
  updateUser(id: string, params: UpdateUserParams): Promise<User>;
}
