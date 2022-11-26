import { Module } from '@nestjs/common';
import { User, UserSchema } from './schemas/user.schema'
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Room, RoomSchema } from 'src/gateway/schemas/room.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    MongooseModule.forFeature([{name: Room.name, schema: RoomSchema}]),
    PassportModule,
    JwtModule.register({
      secret: 'V3rySEc9eTP4ssW0RD',
      signOptions: { expiresIn: '24h', },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
