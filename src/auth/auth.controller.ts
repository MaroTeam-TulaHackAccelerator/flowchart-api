import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto, NewUserDto } from './dto/user.dto';

@Controller('/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private logger: Logger = new Logger('AuthController');

  @Post('/auth/signin')
  async signIn(@Body() body: UserDto) {
    const user = await this.authService.validateUser(body.login, body.password);
    if (!user) {
      return "no"
    }
    return user;
  }

  @Post('/auth/signup')
  signUp(@Body() body: NewUserDto) {
    console.log(body)
    const user = this.authService.createUser(
      body.login,
      body.email,
      body.password,
    );
    this.logger.log(user);
    if (!user) {
      return 'no';
    }
    return user;
  }
}
