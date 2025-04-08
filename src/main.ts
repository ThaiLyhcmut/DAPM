import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocsSwagger } from './conf/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  DocsSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
