import { container } from 'tsyringe';
import { EtherealMailProvider } from '../providers/MailProvider/implementations/EtherealMailProvider';
import { IMailProvider } from '../providers/MailProvider/models/IMailProvider';
import HandlebarsMailTemplateProvider from '../providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';
import IMailTemplateProvider from '../providers/MailTemplateProvider/models/IMailTemplateProvider';
import { ISurveysRepository } from '../repositories/ISurveysRepository';
import { ISurveysUsersRepository } from '../repositories/ISurveysUsersRepository';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { UsersRepository } from '../repositories/UsersRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);

container.registerSingleton<ISurveysRepository>('SurveysRepository', SurveysRepository);

container.registerSingleton<ISurveysUsersRepository>('SurveysUsersRepository', SurveysUsersRepository);

container.registerSingleton<IMailProvider>('MailProvider', EtherealMailProvider)

container.registerSingleton<IMailTemplateProvider>('MailTemplateProvider', HandlebarsMailTemplateProvider)
