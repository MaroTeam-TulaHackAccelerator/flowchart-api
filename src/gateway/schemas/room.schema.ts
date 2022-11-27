import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @Prop({required: true})
  userId: string

  @Prop({required: true})
  roomId: string
}

export const RoomSchema = SchemaFactory.createForClass(Room)