import { Product } from "../../../models/product";
import { ok, serverError } from "../../helpers";
import { ControllerProps, HttpResponse } from "../../protocols";
import { GetProductsRepositoryProps } from "./protocols";

export class GetProductsController implements ControllerProps {
  constructor(private readonly getProductsRepository: GetProductsRepositoryProps) {}

  async handle(): Promise<HttpResponse<Product[] | string>> {
    try {
      const products = await this.getProductsRepository.getProducts();

      return ok<Product[]>(products);
    } catch (error) {
      return serverError();
    }
  }
}
