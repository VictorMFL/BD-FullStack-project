import { User } from "../../models/user";
import { ok, serverError } from "../helpers";
import { ControllerProps, HttpResponse } from "../protocols";
import { GetUsersRepositoryProps } from "./protocols";

export class GetUsersController implements ControllerProps {
  constructor(private readonly getUsersRepository: GetUsersRepositoryProps) {}

  async handle():Promise<HttpResponse<User[]  | string>> {
    try {
      const users = await this.getUsersRepository.getUsers();

      return ok<User[]>(users)
    } catch (error) {
      return serverError()
    }
  }
}
