import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mongoose from 'mongoose'

async function bootstrap() {
  // await mongoose.connect('mongodb://admin:admin@localhost:27017')
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
