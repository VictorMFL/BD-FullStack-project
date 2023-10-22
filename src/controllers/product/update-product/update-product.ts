import { Product } from "../../../models/product";
import { badRequest, ok, serverError } from "../../helpers";
import { ControllerProps, HttpRequest, HttpResponse } from "../../protocols";
import { UpdateProductParams, UpdateProductRepositoryProps } from "./protocols";

export class UpdateProductController implements ControllerProps {
  constructor(
    private readonly updateProductRepository: UpdateProductRepositoryProps
  ) {}
  async handle(
    httpRequest: HttpRequest<UpdateProductParams>
  ): Promise<HttpResponse<Product | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Missing fields");
      }

      if (!id) {
        return badRequest("Missing user id");
      }

      // Campos que podem ser alterados
      const allowedFieldsToUpdate: (keyof UpdateProductParams)[] = [
        "catalog",
        "quantity",
        "discount",
        "price",
        "title",
      ];

      // Verifica se algumm campo que não pode ser alterado está na requisição
      const someFiledIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateProductParams)
      );

      if (someFiledIsNotAllowedToUpdate) {
        return badRequest("Some received field is not allowed");
      }

      const user = await this.updateProductRepository.updateProduct(id, body);

      return ok<Product>(user);
    } catch (error) {
      return serverError();
    }
  }
}
