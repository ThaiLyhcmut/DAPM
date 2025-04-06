import { Module, forwardRef } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { resolve } from 'path';

import { MailserverService } from './mailserver.service';
import { MailserverController } from './mailserver.controller';
import { TypeOrmExModule } from '../../core/repositories/typeorm-ex.module';
import { OtpRepository } from './repositories/otp.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    ConfigModule.forRoot(),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_HOST') || 'localhost',
          port: parseInt(config.get('MAIL_PORT') || '587'),
          secure: config.get('MAIL_SECURE') === 'true' || false,
          auth: {
            user: config.get('MAIL_USER') || '',
            pass: config.get('MAIL_PASSWORD') || '',
          },
        },
        defaults: {
          from: `"${config.get('MAIL_FROM_NAME') || 'No Reply'}" <${config.get('MAIL_FROM') || 'noreply@example.com'}>`,
        },
        template: {
          dir: join(process.cwd(), 'src/modules/mailserver/templates'),
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    TypeOrmExModule.forCustomRepository([OtpRepository]),
  ],
  controllers: [MailserverController],
  providers: [MailserverService],
  exports: [MailserverService],
})
export class MailserverModule {}
