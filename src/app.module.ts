import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from './gateway/gateway.module';
import { AuthModule } from './auth/auth.module';
import { Room, RoomSchema } from './gateway/schemas/room.schema';
import { RoomState, RoomStateSchema } from './gateway/schemas/room-state.schema';

const DB_URI = process.env.DB_URI ? process.env.DB_URI : 'mongodb://admin:admin@localhost:27017'

@Module({
  imports: [
    MongooseModule.forFeature([{name: Room.name, schema: RoomSchema},
      {name: RoomState.name, schema: RoomStateSchema}]),
    GatewayModule,
    AuthModule,
    MongooseModule.forRoot(DB_URI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
