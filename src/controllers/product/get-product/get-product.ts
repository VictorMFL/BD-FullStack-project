import { Product } from "../../../models/product";
import { ok, serverError } from "../../helpers";
import { ControllerProps, HttpRequest, HttpResponse } from "../../protocols";
import { GetProductRepositoryProps } from "./protocols";

export class GetProductController implements ControllerProps {
  constructor(private readonly getProductRepository: GetProductRepositoryProps) {}

  async handle(
    httpRequest: HttpRequest<string>
  ): Promise<HttpResponse<Product[] | string>> {
    try {
      const product = await this.getProductRepository.getProduct(
        httpRequest?.params?.id
      );

      return ok<Product[]>(product);
    } catch (error) {
      return serverError();
    }
  }
}
