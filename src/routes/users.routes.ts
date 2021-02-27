import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { UsersController } from "../controllers/UsersController";

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post('/', celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
  }),
}), usersController.create);

export { usersRouter };
