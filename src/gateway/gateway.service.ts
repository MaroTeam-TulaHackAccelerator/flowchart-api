import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewStateDto } from './dto/new-state.dto';
import { ChatMessageDto } from '../dto/newChatmessage.dto';
import { NewRoomDto } from '../dto/newRoom.dto'
import { Message, MessageDocument } from './schemas/message.schema';
import { RoomState, RoomStateDocument } from './schemas/room-state.schema';
import { Room, RoomDocument } from '../schemas/room.schema'

@Injectable()
export class GatewayService {
  constructor(@InjectModel(Room.name) private readonly roomModel: Model<RoomDocument>,
  @InjectModel(Message.name) private readonly messageModel: Model<MessageDocument>,
  @InjectModel(RoomState.name) private readonly stateModel: Model<RoomStateDocument>) {}

  async saveMessage(message: ChatMessageDto) {
    const messagesEntity = await this.messageModel.findOne({roomId: message.roomId});
    messagesEntity.messages.push(message);
    messagesEntity.save();
  }

  async saveRoom(roomDto: NewRoomDto) {
    const room = await this.roomModel.create(roomDto);
    const messages = await this.messageModel.create({roomId: roomDto.roomId, messages: []});
    return {room: room, messages: messages};
  }

  async saveState(stateDto: NewStateDto) {
    const state = await this.stateModel.findOne({roomId: stateDto.roomId});
    if(!state){
      return await this.stateModel.create(stateDto);
    }
    console.log(state);
    state.roomState = stateDto.roomState;
    state.save();
  }
}
