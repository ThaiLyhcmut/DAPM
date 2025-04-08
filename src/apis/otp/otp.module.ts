import { Module } from "@nestjs/common";
import { TypeOrmExModule } from "src/core/repositories/typeorm-ex.module";
import { OtpRepository } from "./repository/otp.repository";
import { ConfigModule } from "@nestjs/config";
import { OtpController } from "./otp.controller";
import { OtpService } from "./otp.service";

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([OtpRepository]),
    ConfigModule.forRoot(), 
  ],
  controllers: [OtpController],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule { }
