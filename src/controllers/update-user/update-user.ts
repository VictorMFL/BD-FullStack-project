import { User } from "../../models/user";
import { badRequest, ok, serverError } from "../helpers";
import { ControllerProps, HttpRequest, HttpResponse } from "../protocols";
import { UpdateUserParams, UpdateUserRepositoryProps } from "./protocols";

export class UpdateUserController implements ControllerProps {
  constructor(
    private readonly updateUserRepository: UpdateUserRepositoryProps
  ) {}
  async handle(
    httpRequest: HttpRequest<UpdateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Missing fields")
      }

      if (!id) {
        return badRequest("Missing user id")
      }

      const allowedFieldsToUpdate: (keyof UpdateUserParams)[] = [
        "firstName",
        "lastName",
        "password",
      ];

      const someFiledIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateUserParams)
      );

      if (someFiledIsNotAllowedToUpdate) {
        return badRequest("Some received field is not allowed")
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return ok<User>(user)
    } catch (error) {
      return serverError()
    }
  }
}
