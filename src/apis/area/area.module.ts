import { Module } from "@nestjs/common";
import { Type } from "class-transformer";
import { TypeOrmExModule } from "src/core/repositories/typeorm-ex.module";
import { AreaRepository } from "./repository/area.repository";
import { PassportModule } from "@nestjs/passport";
import { AreaController } from "./area.controller";
import { AreaService } from "./area.service";
import { LocalStrategy } from "src/core/passport/local.strategy";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "../auth/auth.module";


@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([AreaRepository]),
    ConfigModule.forRoot(),
    AuthModule
  ],
  controllers: [AreaController],
  providers: [AreaService],
  exports: [AreaService],
})

export class AreaModule {}