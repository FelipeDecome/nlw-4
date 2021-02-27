import { inject, injectable } from "tsyringe";
import { ISurveysUsersRepository } from "../repositories/ISurveysUsersRepository";

interface IRequest {
  survey_id: string;
}

interface IResponse {
  promoters: number;
  detractors: number;
  passives: number;
  nps: number;
}

@injectable()
class CalculateNpsService {

  constructor(
    @inject('SurveysUsersRepository')
    private surveysUsersRepository: ISurveysUsersRepository,
    ) {}

  public async execute({ survey_id }: IRequest): Promise<IResponse> {
    const surveyUsers = await this.surveysUsersRepository.findAllBySurveyId(survey_id);

    const detractors = surveyUsers.filter(
      survey => survey.value >= 1 && survey.value <= 6
    ).length;

    const promoters = surveyUsers.filter(
      survey => survey.value >= 9 && survey.value <= 10
    ).length;

    const passives = surveyUsers.filter(
      survey => survey.value >= 7 && survey.value <= 8
    ).length;

    const totalAnswers = surveyUsers.filter(
      survey => survey.value !== null
    ).length;

    const result = (((promoters - detractors) / totalAnswers) * 100).toFixed(2);

    return {
      promoters,
      detractors,
      passives,
      nps: Number(result),
    };
  }
}

export { CalculateNpsService };
