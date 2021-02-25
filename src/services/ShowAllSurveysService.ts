import { inject, injectable } from "tsyringe";
import { Survey } from "../entities/Survey";
import { ISurveysRepository } from "../repositories/ISurveysRepository";

@injectable()
class ShowAllSurveysService {

  constructor(
    @inject('SurveysRepository')
    private surveysRepository: ISurveysRepository,
    ) {}

  public async execute(): Promise<Survey[]> {
    return this.surveysRepository.findAll();
  }
}

export { ShowAllSurveysService };
