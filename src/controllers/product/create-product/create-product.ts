import { Product } from "../../../models/product";
import { ControllerProps, HttpRequest, HttpResponse } from "../../protocols";
import { CreateProductParams, CreateProductRepositoryProps } from "./protocols";
import { badRequest, created, serverError } from "../../helpers";

export class CreateProductController implements ControllerProps {
  constructor(
    private readonly createProductRepository: CreateProductRepositoryProps
  ) {}
  async handle(
    httpRequest: HttpRequest<CreateProductParams>
  ): Promise<HttpResponse<Product | string>> {
    try {
      // verifica os campos obrigatórios
      const requiredFields = ["title", "quantity", "category", "price", "imageUrl"];

      for (const field of requiredFields) {
        const value = httpRequest?.body?.[field as keyof CreateProductParams]

        // faz a verificação se os campos obrigatórios estão sem dados
        if (value === undefined || value === null || value === '') {
          return badRequest(`Field ${field} is required`);
        }
      }

      const product = await this.createProductRepository.createProduct(
        httpRequest.body!
      );

      return created<Product>(product);
    } catch (error) {
      return serverError();
    }
  }
}
