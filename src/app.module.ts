import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UserModule, ConfigModule.forRoot({
    envFilePath: '.env'
  }), TypeOrmModule.forRoot({
    type: process.env.DB_TYPE as any || "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as any,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSW,
    database: process.env.DB_DATABASE,
    entities: [],
    synchronize: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
