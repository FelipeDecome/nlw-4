import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserSurveyValueService } from "../services/UpdateUserSurveyValueService";

class AnswersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { value } = request.params;
    const { id } = request.query;

    const updateUserSurveyValueService = container.resolve(UpdateUserSurveyValueService);

    const surveyUser = await updateUserSurveyValueService.execute({
      id: String(id),
      value: Number(value),
    });

    return response.json(surveyUser);
  }
}

export { AnswersController };
