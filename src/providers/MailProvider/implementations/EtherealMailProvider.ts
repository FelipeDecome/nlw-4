import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import { IMailProvider } from '../models/IMailProvider';

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider
    ) {}

  public async send({ from, to, subject, templateData}: ISendMailDTO): Promise<void> {
    await this.init();

    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'noreplay',
        address: from?.email || 'noreplay@surveys.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }

  private async init(): Promise<void> {
    if(!this.client) {
      const account = await nodemailer.createTestAccount();

      const { user, pass } = account;
      const {host, port, secure} = account.smtp;

      const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
          user,
          pass,
        }
      });

      this.client = transporter;
    }
  }

}

export { EtherealMailProvider };
