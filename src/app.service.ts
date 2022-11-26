import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthWorker } from 'src/auth/auth';
import { Room, RoomDocument } from './schemas/room.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<RoomDocument>,
  ) {}

  async getUserProjects(userid: string) {
    const projects = await this.roomModel.find({userId: userid})
    return projects
  }
}
