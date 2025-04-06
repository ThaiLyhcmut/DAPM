import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "src/core/passport/local.strategy";
import { JWTStratagy } from "src/core/passport/jwt.stratagy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Auth } from "./entities/auth.entity";
import { TypeOrmExModule } from "src/core/repositories/typeorm-ex.module";
import { AuthRepository } from "./repository/auth.repository";

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([AuthRepository]),
    ConfigModule.forRoot(), PassportModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1h' }
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JWTStratagy],
  exports: [AuthService],
})
export class AuthModule { }
