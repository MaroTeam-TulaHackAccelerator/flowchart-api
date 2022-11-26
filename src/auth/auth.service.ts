import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Room, RoomDocument } from 'src/gateway/schemas/room.schema';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Room.name) private readonly roomModel: Model<RoomDocument>,
    private jwtService: JwtService) {}

  async createUser(login: string, email: string, password: string) {
    const user = await this.userModel.create({
      login: login,
      email: email,
      password: await bcrypt.hash(password, 7),
    });

    return user;
  }

  async validateUser(login: string, password: string) {
    const user = await this.userModel.findOne({login: login}).exec();
    if (!user) {
      return null;
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (user && passwordValid) {
      return user;
    }

    return null;
  }

  generateToken(user: any) {
    const payload = {
      login: user.login,
      userid: user._id,
    }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  parseToken(token: string) {
    const user = this.jwtService.verify(token)
    return user
  }

  async getUserProjects(userid: string) {
    const projects = await this.roomModel.find({userId: userid})
    return projects
  }
}
