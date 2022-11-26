import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from './gateway/gateway.module';

const DB_URI = process.env.DB_URI ? process.env.DB_URI : 'mongodb://admin:admin@localhost:27017'

@Module({
  imports: [GatewayModule, MongooseModule.forRoot(DB_URI)],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
