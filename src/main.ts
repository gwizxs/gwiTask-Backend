import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
