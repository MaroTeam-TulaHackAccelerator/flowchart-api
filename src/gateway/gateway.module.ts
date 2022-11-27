import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from './schemas/room.schema';
import { AppGateway } from './gateway';
import { GatewayService } from './gateway.service';
import { RoomState, RoomStateSchema } from './schemas/room-state.schema';
import { Message, MessageSchema } from './schemas/message.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{name: Room.name, schema: RoomSchema}, 
      {name: RoomState.name, schema: RoomStateSchema},
      {name: Message.name, schema: MessageSchema}]),
  ],
  providers: [AppGateway, GatewayService],
})
export class GatewayModule {}
