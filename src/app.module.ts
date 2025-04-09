import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from './router/router.module';
import { Auth } from './apis/auth/entities/auth.entity';
import { Otp } from './apis/otp/entities/otp.entity';
import { Home } from './apis/home/entities/home.entity';
import { Area } from './apis/area/entities/area-entity';
import { Equipment } from './apis/equipment/entities/equipment.entity';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env'
  }), TypeOrmModule.forRoot({
    type: process.env.DB_TYPE as any || "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as any,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSW,
    database: process.env.DB_DATABASE,
    entities: [Auth, Otp, Home, Area, Equipment],
    synchronize: true,
  }), RouterModule.forRoot()], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
