import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatMessageDto } from './dto/newChatmessage.dto';
import { NewRoomDto } from './dto/newRoom.dto'
import { Room, RoomDocument } from './schemas/room.schema'

@Injectable()
export class ChatService {
  constructor(@InjectModel(Room.name) private readonly model: Model<RoomDocument>) {}

  async saveMessage(message: ChatMessageDto) {
    const room = await this.model.findOne({roomId: message.roomId})
    room.messages.push(message)
    room.save()
  }

  async saveRoom(roomDto: NewRoomDto) {
    const room = await this.model.create(roomDto)
    return room
  }
}
