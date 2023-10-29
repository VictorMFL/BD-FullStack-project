import { User } from "../../../models/user";
import { ok, serverError } from "../../helpers";
import { ControllerProps, HttpRequest, HttpResponse } from "../../protocols";
import { GetUserRepositoryProps } from "./protocols";

export class GetUserController implements ControllerProps {
  constructor(private readonly getUserRepository: GetUserRepositoryProps) {}

  async handle(
    httpRequest: HttpRequest<string>
  ): Promise<HttpResponse<User[] | string>> {
    try {
      const user = await this.getUserRepository.getUser(
        httpRequest?.params?.id
      );

      return ok<User[]>(user);
    } catch (error) {
      return serverError();
    }
  }
}
