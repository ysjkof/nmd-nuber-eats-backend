import got from 'got';
import * as FormData from 'form-data';
import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from '../common/common.constants';
import { EmailVar, MailModuleOptions } from './mail.interfaces';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {
    // this.sendEmail('testing', 'test');
  }
  private async sendEmail(
    subject: string,
    // to:string,
    template: string,
    emailVas: EmailVar[],
  ): Promise<boolean> {
    const form = new FormData();
    form.append('from', `클론코딩누버이츠 <mailgun@${this.options.domain}>`);
    form.append('to', `ysjkof@gmail.com`);
    form.append('subject', subject);
    form.append('template', template);
    emailVas.forEach(eVar => form.append(`v:${eVar.key}`, eVar.value));
    try {
      await got.post(
        `https://api.mailgun.net/v3/${this.options.domain}/messages`,
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              `api:${this.options.apiKey}`,
            ).toString('base64')}`,
          },
          body: form,
        },
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  sendVerificationEmail(email: string, code: string) {
    this.sendEmail('Verify your Email', 'verify-email', [
      { key: 'code', value: code },
      { key: 'username', value: email },
    ]);
  }
}
