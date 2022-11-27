import {
    Prop,
    Schema,
    SchemaFactory,
  } from '@nestjs/mongoose';
  import { Document, Types } from 'mongoose';
  
  export type RoomStateDocument = RoomState & Document;
  
  @Schema()
  export class RoomState {  
    @Prop({required: true})
    roomId: string
    
    @Prop({type: Types.Array})
    roomState: any
  }
  
  export const RoomStateSchema = SchemaFactory.createForClass(RoomState)