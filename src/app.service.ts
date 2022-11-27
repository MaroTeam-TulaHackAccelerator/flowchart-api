import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoomState, RoomStateDocument } from './gateway/schemas/room-state.schema';
import { Room, RoomDocument } from './gateway/schemas/room.schema';

@Injectable()
export class AppService {    
    constructor(@InjectModel(Room.name) private readonly roomModel: Model<RoomDocument>,
    @InjectModel(RoomState.name) private readonly stateModel: Model<RoomStateDocument>) {}

    async getWorkspace(roomId: string){
        const state = await this.stateModel.findOne({roomId: roomId});
        return state;
    }
}
