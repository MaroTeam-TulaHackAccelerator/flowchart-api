import { Module } from '@nestjs/common';
import { User, UserSchema } from './schemas/user.schema'
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
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
