import path from 'path';
import { inject, injectable } from 'tsyringe';
import { SurveyUser } from '../entities/SurveyUser';

import { AppError } from "../Errors/AppError";
import { IMailProvider } from "../providers/MailProvider/models/IMailProvider";
import { ISurveysRepository } from "../repositories/ISurveysRepository";
import { ISurveysUsersRepository } from "../repositories/ISurveysUsersRepository";
import { IUsersRepository } from "../repositories/IUsersRepository";

interface IRequest {
  email: string;
  survey_id: string;
}

@injectable()
class SendSurveyMailService {

  constructor(
    @inject('SurveysUsersRepository')
    private surveysusersRepository: ISurveysUsersRepository,

    @inject('SurveysRepository')
    private surveysRepository: ISurveysRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
    ) {}

  public async execute({email, survey_id}: IRequest): Promise<SurveyUser> {
    const user = await this.usersRepository.findByEmail(email);

    if(!user) throw new AppError('User not found.');

    const survey = await this.surveysRepository.findById(survey_id);

    if(!survey) throw new AppError('Survey not found.');

    let surveyUser = await this.surveysusersRepository.findByUserSurveyId(user.id, survey.id);

    if(!surveyUser) {
      surveyUser = await this.surveysusersRepository.create({
        user_id: user.id,
        survey_id,
      });
    }

    if (surveyUser.value) throw new AppError('The user already answered this survey.');

    await this.mailProvider.send({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: survey.title,
      templateData: {
        file: path.resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs'),
        variables: {
          name: user.name,
          title: survey.title,
          description: survey.description,
          id: surveyUser.id,
          link: `${process.env.API_URL}/answers`,
        }
      },
    });

    return surveyUser;
  }
}

export { SendSurveyMailService };
