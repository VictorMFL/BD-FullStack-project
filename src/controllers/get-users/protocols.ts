import { User } from "../../models/user";
import { HttpResponse } from "../protocols";

export interface GetUsersControllerProps {
  handle(): Promise<HttpResponse<User[]>>;
}

export interface GetUsersRepositoryProps {
  getUsers(): Promise<User[]>
}