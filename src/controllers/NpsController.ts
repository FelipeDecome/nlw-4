import { Request, Response } from "express";
import { container } from "tsyringe";
import { CalculateNpsService } from "../services/CalculateNpsService";

class NpsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { survey_id } = request.params;

    const calculateNpsService = container.resolve(CalculateNpsService);

    const result = await calculateNpsService.execute({
      survey_id,
    });

    return response.json(result);
  }
}

export { NpsController }
