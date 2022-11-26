import { Body, Controller, Logger, Post, Get, Headers } from '@nestjs/common';
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

    return this.authService.generateToken(user);
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

    return this.authService.generateToken(user);
  }

  @Get('/getprojects')
  async getProjects(@Headers('Authorization') data: string) {
    if (!data) {
      return null
    }
    const token = data.split(' ')[1];

    const user = this.authService.parseToken(token);
    if (!user) {
      return null
    }

    console.log(user)

    const projects = await this.authService.getUserProjects(user.userid);
    console.log(projects)
  }
}
