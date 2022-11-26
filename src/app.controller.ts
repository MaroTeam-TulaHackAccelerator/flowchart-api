import { Controller, Get, Headers } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthWorker } from './auth/auth';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  private readonly authWorker: AuthWorker = new AuthWorker()

  @Get('/getprojects')
  async getProjects(@Headers('Authorization') data: string) {
    if (!data) {
      return null
    }
    const token = data.split(' ')[1];

    const user = this.authWorker.parseToken(token);
    if (!user) {
      return null
    }

    console.log(user)

    const projects = await this.appService.getUserProjects(user.userid);
    console.log(projects)
  }
}
