import express from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/user/get-users/get-users";
import { MongoGetUsersRepository } from "./repositories/user/get-users/mongo-get-users";
import { MongoClient } from "./database/mongo";
import { MongoCreateUserRepository } from "./repositories/user/create-user/mongo-create-user";
import { CreateUserController } from "./controllers/user/create-user/create-user";
import { MongoUpdateUserRepository } from "./repositories/user/update-user/mongo-update-user";
import { UpdateUserController } from "./controllers/user/update-user/update-user";
import { MongoDeleteUserRepository } from "./repositories/user/delete-user/mongo-delete-user";
import { DeleteUserController } from "./controllers/user/delete-user/delete-user";
import { MongoGetProductsRepository } from "./repositories/product/get-products/mongo-get-products";
import { GetProductsController } from "./controllers/product/get-products/get-products";
import { MongoCreateProductRepository } from "./repositories/product/create-product/mongo-create-product";
import { CreateProductController } from "./controllers/product/create-product/create-product";
import { MongoDeleteProductRepository } from "./repositories/product/delete-product/mongo-delete-product";
import { DeleteProductController } from "./controllers/product/delete-product/delete-product";
import { MongoUpdateProductRepository } from "./repositories/product/update-product/mongo-update-product";
import { UpdateProductController } from "./controllers/product/update-product/update-product";
import { MongoGetUserRepository } from "./repositories/user/get-user/mongo-get-user";
import { GetUserController } from "./controllers/user/get-user/get.user";

const main = async () => {
  config();

  const app = express();

  app.use(express.json());

  await MongoClient.connect();

  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();

    const getUsersController = new GetUsersController(mongoGetUsersRepository);

    const { body, statusCode } = await getUsersController.handle();

    res.status(statusCode).send(body);
  });

  app.get("/user/:id", async (req, res) => {
    const mongoGetUserRepository = new MongoGetUserRepository();

    const getUserController = new GetUserController(mongoGetUserRepository);

    const { body, statusCode } = await getUserController.handle({
      params: req.params
    });

    res.status(statusCode).send(body);
  });

  app.post("/user", async (req, res) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository();

    const createUserController = new CreateUserController(
      mongoCreateUserRepository
    );

    const { body, statusCode } = await createUserController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  app.patch("/user/:id", async (req, res) => {
    const mongoUpdateUserRepository = new MongoUpdateUserRepository();

    const updateUserController = new UpdateUserController(
      mongoUpdateUserRepository
    );

    const { body, statusCode } = await updateUserController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  app.put("/user/:id", async (req, res) => {
    const mongoUpdateUserRepository = new MongoUpdateUserRepository();

    const updateUserController = new UpdateUserController(
      mongoUpdateUserRepository
    );

    const { body, statusCode } = await updateUserController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  app.delete("/user/:id", async (req, res) => {
    const mongoDeleteUserRepository = new MongoDeleteUserRepository();

    const deleteUserController = new DeleteUserController(
      mongoDeleteUserRepository
    );

    const { body, statusCode } = await deleteUserController.handle({
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  app.get("/products", async (req, res) => {
    const mongoGetProductsRepository = new MongoGetProductsRepository();

    const getProductsController = new GetProductsController(
      mongoGetProductsRepository
    );

    const { body, statusCode } = await getProductsController.handle();

    res.status(statusCode).send(body);
  });

  app.post("/product", async (req, res) => {
    const mongoCreateProductRepository = new MongoCreateProductRepository();

    const createProductController = new CreateProductController(
      mongoCreateProductRepository
    );

    const { body, statusCode } = await createProductController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  app.delete("/product/:id", async (req, res) => {
    const mongoDeleteProductRepository = new MongoDeleteProductRepository();

    const deleteProductController = new DeleteProductController(
      mongoDeleteProductRepository
    );

    const { body, statusCode } = await deleteProductController.handle({
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  app.put("/product/:id", async (req, res) => {
    const mongoUpdateProductRepository = new MongoUpdateProductRepository();

    const updateProductController = new UpdateProductController(
      mongoUpdateProductRepository
    );

    const { body, statusCode } = await updateProductController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log(`Listening on port ${port}`));
};

main();
