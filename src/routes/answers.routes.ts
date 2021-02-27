import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { AnswersController } from "../controllers/AnswesrController";

const answersController = new AnswersController();

const answersRouter = Router();

answersRouter.get('/:value', celebrate({
  [Segments.PARAMS]: Joi.object({
    value:
      Joi.number().min(1).max(10).required(),
  }),
  [Segments.QUERY]: Joi.object({
    id: Joi.string().uuid().required(),
  }),
}), answersController.create);

export { answersRouter };
