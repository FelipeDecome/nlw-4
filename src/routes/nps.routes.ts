import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { NpsController } from "../controllers/NpsController";

const npsController = new NpsController();

const npsRouter = Router();

npsRouter.get('/:survey_id', celebrate({
  [Segments.PARAMS]: Joi.object({
    survey_id: Joi.string().uuid().required(),
  }),
}), npsController.create);

export { npsRouter };
