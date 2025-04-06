import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Auth } from './modules/auth/entities/auth.entity';
import { User } from './modules/user/entities/user.entity';
import { Otp } from './modules/mailserver/entities/otp.entity';
import { MailserverModule } from './modules/mailserver/mailserver.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { Product } from './modules/product/entities/product.entiti';
import { ProductModule } from './modules/product/product.module';
import { RouterModule } from './router/router.module';

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
    entities: [Auth, User, Otp, Product],
    synchronize: true,
  }), RouterModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
