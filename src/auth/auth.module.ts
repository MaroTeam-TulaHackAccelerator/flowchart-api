import { Module } from '@nestjs/common';
import { User, UserSchema } from './schemas/user.schema'
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
