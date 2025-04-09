import { Module } from "@nestjs/common";
import { Type } from "class-transformer";
import { TypeOrmExModule } from "src/core/repositories/typeorm-ex.module";
import { EquipmentRepository } from "./repository/equipment.repository";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "../auth/auth.module";
import { EquipmentController } from "./equipment.controller";
import { EquipmentService } from "./equipment.service";
import { AreaService } from "../area/area.service";
import { HomeService } from "../home/home.service";
import { AreaModule } from "../area/area.module";
import { HomeModule } from "../home/home.module";


@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([EquipmentRepository]),
    ConfigModule.forRoot(),
    AuthModule,
    AreaModule,
    HomeModule
  ],
  controllers: [EquipmentController],
  providers: [EquipmentService],
  exports: [EquipmentService],
})

export class EquipmentModule {}