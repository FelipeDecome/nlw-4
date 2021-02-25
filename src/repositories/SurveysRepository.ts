import { getRepository, Repository } from "typeorm";
import { ICreateSurveyDTO } from "../dtos/ICreateSurveyDTO";

import { Survey } from "../entities/Survey";
import { ISurveysRepository } from "./ISurveysRepository";

class SurveysRepository implements ISurveysRepository {
  private ormRepository: Repository<Survey>;

  constructor() {
    this.ormRepository = getRepository(Survey);
  }

  public async create({ title, description }: ICreateSurveyDTO): Promise<Survey> {
    const survey = this.ormRepository.create({
      title,
      description,
    });

    return this.ormRepository.save(survey);
  }

  public async findById(id: string): Promise<Survey | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findAll(): Promise<Survey[]> {
    return this.ormRepository.find();
  }
}

export { SurveysRepository };
