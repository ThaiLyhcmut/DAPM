import { Module } from "@nestjs/common";
import { AreaModule } from "src/apis/area/area.module";
import { AuthModule } from "src/apis/auth/auth.module";
import { OtpModule } from "src/apis/otp/otp.module";




@Module({
  imports: [AuthModule, OtpModule],
  controllers: [],
  providers: [],
  exports: [],
})

export class RoutesAccountModule {}