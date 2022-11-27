import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { AuthWorker } from './auth';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  private readonly authWorker: AuthWorker = new AuthWorker()

  async createUser(login: string, email: string, password: string) {
    const user = await this.userModel.create({
      login: login,
      email: email,
      password: await bcrypt.hash(password, 7),
    });

    return this.authWorker.generateToken(user);
  }

  async validateUser(login: string, password: string) {
    const user = await this.userModel.findOne({login: login}).exec();
    if (!user) {
      return null;
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (user && passwordValid) {
      return this.authWorker.generateToken(user);
    }

    return null;
  }
}
