import { User } from "../../models/user";
import { ControllerProps, HttpRequest, HttpResponse } from "../protocols";
import { UpdateUserParams, UpdateUserRepositoryProps } from "./protocols";

export class UpdateUserController implements ControllerProps {
  constructor(
    private readonly updateUserRepository: UpdateUserRepositoryProps
  ) {}
  async handle(
    httpRequest: HttpRequest<UpdateUserParams>
  ): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return {
          statusCode: 400,
          body: "Missing fields",
        };
      }

      if (!id) {
        return {
          statusCode: 400,
          body: "Missing user id",
        };
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
        return {
          statusCode: 400,
          body: "Some received field is not allowed",
        };
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return {
        statusCode: 200,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong.",
      };
    }
  }
}
