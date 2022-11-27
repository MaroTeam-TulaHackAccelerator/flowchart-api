import {
    Prop,
    Schema,
    SchemaFactory,
  } from '@nestjs/mongoose';
  import { Document } from 'mongoose';
  import { ChatMessageDto } from '../../dto/newChatmessage.dto';
  
  export type MessageDocument = Message & Document;
  
  @Schema()
  export class Message {  
    @Prop({required: true})
    roomId: string
  
    @Prop()
    messages: Array<ChatMessageDto>
  }
  
  export const MessageSchema = SchemaFactory.createForClass(Message)