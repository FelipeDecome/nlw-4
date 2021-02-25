import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSurveyService } from "../services/CreateSurveyService";
import { ShowAllSurveysService } from "../services/ShowAllSurveysService";

class SurveysController {

  async create(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;

    const createSurveyService = container.resolve(CreateSurveyService)

    const survey = await createSurveyService.execute({
      title,
      description,
    })

    return response.status(201).json(survey);
  }

  async show(request: Request, response: Response): Promise<Response> {

    const showAllSurveysService = container.resolve(ShowAllSurveysService)

    const surveys = await showAllSurveysService.execute();

    return response.json(surveys);
  }
}

export { SurveysController };

