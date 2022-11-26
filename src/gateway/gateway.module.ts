import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from './schemas/room.schema';
import { AppGateway } from './gateway';
import { GatewayService } from './gateway.service';


@Module({
  imports: [
    MongooseModule.forFeature([{name: Room.name, schema: RoomSchema}]),
  ],
  providers: [AppGateway, GatewayService],
})
export class GatewayModule {}
