/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "../../../models/user";
import { badRequest, ok, serverError } from "../../helpers";
import { ControllerProps, HttpRequest, HttpResponse } from "../../protocols";
import { DeleteUserRepositoryProps } from "./protocols";

export class DeleteUserController implements ControllerProps {
  constructor(
    private readonly deleteUserRepository: DeleteUserRepositoryProps
  ) {}
  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing user id");
      }

      const user = await this.deleteUserRepository.deleteUser(id);

      return ok<User>(user);
    } catch (error) {
      return serverError();
    }
  }
}
