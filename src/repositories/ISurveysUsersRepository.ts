import { ICreateSurveysUsersDTO } from "../dtos/ICreateSurveysUsersDTO";
import { SurveyUser } from "../entities/SurveyUser";

interface ISurveysUsersRepository {
  create(data: ICreateSurveysUsersDTO): Promise<SurveyUser>;
  findById(id: string): Promise<SurveyUser | undefined>;
  findByUserSurveyId(userId:string, surveyId: string): Promise<SurveyUser | undefined>;
  findAllBySurveyId(survey_id: string): Promise<SurveyUser[]>;
  save(survey: SurveyUser): Promise<SurveyUser>;
}

export { ISurveysUsersRepository};
