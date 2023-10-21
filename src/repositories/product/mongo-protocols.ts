import { Product } from "../../models/product";

export type MongoProduct = Omit<Product, "id">;
