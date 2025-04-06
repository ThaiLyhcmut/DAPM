import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ProfileController } from './controllers/profile.controller';
import { MailserverModule } from '../mailserver/mailserver.module';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmExModule } from '../../core/repositories/typeorm-ex.module';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([UserRepository]),
    PassportModule,
    forwardRef(() => MailserverModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController, ProfileController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
