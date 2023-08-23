import { ControllerProps } from "../protocols";
import { GetUsersRepositoryProps } from "./protocols";

export class GetUsersController implements ControllerProps {
  constructor(private readonly getUsersRepository: GetUsersRepositoryProps) {}

  async handle() {
    try {
      const users = await this.getUsersRepository.getUsers();

      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong.",
      };
    }
  }
}
