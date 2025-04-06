import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmExModule } from '../../core/repositories/typeorm-ex.module';
import { AuthRepository } from './repositories/auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/core/passport/local.strategy';
import * as dotenv from 'dotenv';
import { JWTStratagy } from 'src/core/passport/jwt.stratagy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([AuthRepository]), ConfigModule.forRoot(), PassportModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1h' }
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JWTStratagy],
  exports: [AuthService],
})
export class AuthModule { }
