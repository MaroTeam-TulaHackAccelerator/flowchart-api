import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User, UserDocument, UserSchema } from './schemas/user.schema';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private readonly model: Model<UserDocument>, private jwtService: JwtService) {}

  async createUser(login: string, email: string, password: string) {
    console.log(login, password, email);
    const user = await this.model.create({
      login: login,
      email: email,
      password: await bcrypt.hash(password, 7),
    });

    return user;
  }

  async validateUser(login: string, password: string) {
    const user = await this.model.findOne({login: login}).exec();
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
      sub: user._id,
    }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
