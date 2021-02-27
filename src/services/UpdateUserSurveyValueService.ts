import { inject, injectable } from "tsyringe";
import { SurveyUser } from "../entities/SurveyUser";
import { AppError } from "../Errors/AppError";
import { ISurveysUsersRepository } from "../repositories/ISurveysUsersRepository";

interface IRequest {
  id: string;
  value: number;
}

@injectable()
class UpdateUserSurveyValueService {

  constructor(
    @inject('SurveysUsersRepository')
    private surveysUsersRepository: ISurveysUsersRepository,
    ) {}

  public async execute({ id, value }: IRequest): Promise<SurveyUser> {

    const surveyUser = await this.surveysUsersRepository.findById(id);

    if (!surveyUser) throw new AppError('Survey not found');

    if (surveyUser.value) throw new AppError('You already voted.');

    surveyUser.value = value;

    return this.surveysUsersRepository.save(surveyUser);
  }
}

export { UpdateUserSurveyValueService };
