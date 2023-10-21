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

  app.post("/users", async (req, res) => {
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

  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log(`Listening on port ${port}`));
};

main();
