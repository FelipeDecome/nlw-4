import { ICreateSurveyDTO } from "../dtos/ICreateSurveyDTO";
import { Survey } from "../entities/Survey";

interface ISurveysRepository {
  create(data: ICreateSurveyDTO): Promise<Survey>;
  findById(id: string): Promise<Survey | undefined>;
  findAll(): Promise<Survey[]>;
}

export { ISurveysRepository };
