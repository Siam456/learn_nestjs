/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser('siamsiam'));

  await app.listen(3000);
}
bootstrap();
