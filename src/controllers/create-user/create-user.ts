import validator from "validator";

import { User } from "../../models/user";
import { ControllerProps, HttpRequest, HttpResponse } from "../protocols";
import { CreateUserParams, CreateUserRepositoryProps } from "./protocols";
import { badRequest, created, serverError } from "../helpers";

export class CreateUserController implements ControllerProps {
  constructor(
    private readonly createUserRepository: CreateUserRepositoryProps
  ) {}
  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      // verifica os campos obrigatórios
      const requiredFields = ["firstName", "lastName", "email", "password"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return badRequest(`Field ${field} is required`)
        }
      }

      // verifica se o email é válido
      const emailIsValid = validator.isEmail(httpRequest.body!.email);

      if (!emailIsValid) {
        return badRequest("E-mail is invalid")
      }

      const user = await this.createUserRepository.createUser(
        httpRequest.body!
      );

      return created<User>(user)
    } catch (error) {
      return serverError()
    }
  }
}
