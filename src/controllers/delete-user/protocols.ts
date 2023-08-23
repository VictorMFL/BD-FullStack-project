import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface DeleteUserControllerProps {
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>>
}

export interface DeleteUserRepositoryProps {
  deleteUser(id: string): Promise<User>
}
