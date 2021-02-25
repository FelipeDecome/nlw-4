import { getRepository, Repository } from "typeorm";
import { ICreateSurveysUsersDTO } from "../dtos/ICreateSurveysUsersDTO";

import { SurveyUser } from "../entities/SurveyUser";
import { ISurveysUsersRepository } from "./ISurveysUsersRepository";

class SurveysUsersRepository implements ISurveysUsersRepository {
  private ormRepository: Repository<SurveyUser>;

  constructor() {
    this.ormRepository = getRepository(SurveyUser);
  }

  public async create({ user_id, survey_id }: ICreateSurveysUsersDTO): Promise<SurveyUser> {
    const surveyUser = this.ormRepository.create({
      user_id,
      survey_id,
    });

    return this.ormRepository.save(surveyUser);
  }

  public async findByUserId(user_id: string): Promise<SurveyUser | undefined> {
    return this.ormRepository.findOne({
      where: {
        user_id,
      }
    });
  }

  public async save(surveyUser: SurveyUser): Promise<SurveyUser> {
    return this.ormRepository.save(surveyUser);
  }
}

export { SurveysUsersRepository };
