import { BadRequestException, ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationError } from "class-validator";
import * as fs from 'fs';
import * as swaggerUi from 'swagger-ui-express';
import * as path from 'path';

export const DocsSwagger = (app) => {
  const newDocumentation = new DocumentBuilder()
    .setTitle('Dapm API')
    .setDescription('The Dapm API description')
    .setVersion('1.0')
    .addTag('dapm')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, newDocumentation);
  SwaggerModule.setup('docs', app, documentFactory);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get('Reflector')));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Loại bỏ field không khai báo trong DTO
      forbidNonWhitelisted: true, // Báo lỗi nếu có field lạ
      exceptionFactory: (validatorErrors: ValidationError[] = []) => {
        return new BadRequestException(
          validatorErrors.map((error) => ({
            [error.property]: Object.values(error.constraints ? error.constraints : "").join(', ')
          }))
        )
      }
    })
  )
}