import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from './schemas/room.schema';
import { AppGateway } from './gateway';
import { ChatService } from './gateway.service';


@Module({
  imports: [
    MongooseModule.forFeature([{name: Room.name, schema: RoomSchema}]),
  ],
  providers: [AppGateway, ChatService],
})
export class GatewayModule {}
