import { inject, injectable } from "tsyringe";
import { Survey } from "../entities/Survey";
import { ISurveysRepository } from "../repositories/ISurveysRepository";

interface IRequest {
  title: string;
  description: string;
}

@injectable()
class CreateSurveyService {

  constructor(
    @inject('SurveysRepository')
    private surveysRepository: ISurveysRepository,
    ) {}

  public async execute({title, description}: IRequest): Promise<Survey> {
    const survey = await this.surveysRepository.create({
      title,
      description,
    });

    return survey;
  }

}

export { CreateSurveyService };
