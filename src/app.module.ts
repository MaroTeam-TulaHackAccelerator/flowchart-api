import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from './gateway/gateway.module';
import { AuthModule } from './auth/auth.module';
import { Room, RoomSchema } from './schemas/room.schema';
import { AuthWorker } from './auth/auth';

const DB_URI = process.env.DB_URI ? process.env.DB_URI : 'mongodb://admin:admin@localhost:27017'

@Module({
  imports: [
    GatewayModule,
    AuthModule,
    AuthWorker,
    MongooseModule.forRoot(DB_URI),
    MongooseModule.forFeature([{name: Room.name, schema: RoomSchema}]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
