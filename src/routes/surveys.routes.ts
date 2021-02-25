import { Router } from "express";
import { SurveyMailController } from "../controllers/SurveyMailController";
import { SurveysController } from "../controllers/SurveysController";

const surveysRouter = Router();

const surveysController = new SurveysController();
const surveyMailController = new SurveyMailController();

surveysRouter.get('/', surveysController.show);
surveysRouter.post('/', surveysController.create);

surveysRouter.post('/send', surveyMailController.create);

export { surveysRouter };
