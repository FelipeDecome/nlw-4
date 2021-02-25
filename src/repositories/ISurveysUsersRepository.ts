import { ICreateSurveysUsersDTO } from "../dtos/ICreateSurveysUsersDTO";
import { SurveyUser } from "../entities/SurveyUser";

interface ISurveysUsersRepository {
  create(data: ICreateSurveysUsersDTO): Promise<SurveyUser>;
  findByUserId(user_id: string): Promise<SurveyUser | undefined>;
  save(survey: SurveyUser): Promise<SurveyUser>;
}

export { ISurveysUsersRepository };
