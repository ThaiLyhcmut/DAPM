import { Module } from "@nestjs/common";
import { TypeOrmExModule } from "src/core/repositories/typeorm-ex.module";
import { HomeRepository } from "./repository/home.repository";
import { ConfigModule } from "@nestjs/config";
import { Home } from "./entities/home.entity";
import { HomeController } from "./home.controller";
import { HomeService } from "./home.service";
import { AuthModule } from "../auth/auth.module";
import { JwtAuthGuard } from "src/core/guards/jwt-auth.guard";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "src/core/passport/local.strategy";
import { JWTStratagy } from "src/core/passport/jwt.stratagy";



@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([HomeRepository]),
    ConfigModule.forRoot(),
    AuthModule,
    
  ],
  controllers: [HomeController],
  providers: [HomeService],
  exports: [HomeService],
})

export class HomeModule {}