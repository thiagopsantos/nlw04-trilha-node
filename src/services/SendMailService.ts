import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';

class SendMailService {
  private client: Transporter;

  constructor(){
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  async execute(to: string, subject: string, variables: object, path: string){

    const templateFileContent = fs.readFileSync(path).toString('utf8');

    const emailTemplateParse = handlebars.compile(templateFileContent);

    const html = emailTemplateParse(variables);

    const message = await this.client.sendMail({
      from: 'NPS noreply@nps.com.br',
      to,
      subject,
      html,
    });

    console.log(`Message sent: ${message.messageId}`);
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`);
  }
}

export default new SendMailService();
