import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendSurveyMailService } from "../services/SendSurveyMailService";

class SurveyMailController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, survey_id } = request.body;

    const sendSurveyMailService = container.resolve(SendSurveyMailService);

    await sendSurveyMailService.execute({
      email,
      survey_id,
    });

    return response.send();
  }
}

export { SurveyMailController };
