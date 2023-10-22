import { Product } from "../../../models/product";
import { badRequest, ok, serverError } from "../../helpers";
import { ControllerProps, HttpRequest, HttpResponse } from "../../protocols";
import { DeleteProductRepositoryProps } from "./protocols";

export class DeleteProductController implements ControllerProps {
  constructor(
    private readonly deleteProductRepository: DeleteProductRepositoryProps
  ) {}
  async handle(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<Product | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing user id");
      }

      const product = await this.deleteProductRepository.deleteProduct(id);

      return ok<Product>(product);
    } catch (error) {
      return serverError();
    }
  }
}
