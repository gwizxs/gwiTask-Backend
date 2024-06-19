import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from "path"

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(path.join(__dirname, "../uploads"));
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.use(cors({
    origin: ['http://localhost:5173'], 
    credentials: true, 
    exposedHeaders: 'set-cookie', 
  }));

  await app.listen(3000);
}
bootstrap();
