import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ChatMessageDto } from '../dto/newChatmessage.dto';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @Prop({required: true})
  userId: string

  @Prop({required: true})
  roomId: string

  @Prop()
  messages: Array<ChatMessageDto>

  @Prop({type: Types.Array})
  roomState: any
}

export const RoomSchema = SchemaFactory.createForClass(Room)