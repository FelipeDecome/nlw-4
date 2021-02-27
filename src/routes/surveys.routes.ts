import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { SurveyMailController } from "../controllers/SurveyMailController";
import { SurveysController } from "../controllers/SurveysController";

const surveysRouter = Router();

const surveysController = new SurveysController();
const surveyMailController = new SurveyMailController();

surveysRouter.get('/', surveysController.show);
surveysRouter.post('/', celebrate({
  [Segments.BODY]: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
  }),
}), surveysController.create);

surveysRouter.post('/send', surveyMailController.create);

export { surveysRouter };
