import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const DB_URI = process.env.DB_URI ? process.env.DB_URI : 'mongodb://admin:admin@localhost:27017'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
