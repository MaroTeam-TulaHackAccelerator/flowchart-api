import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService){}

    @Get("getWorkspace/:roomId")
    async getWorkspace(@Param('roomId') roomId){
        let room = await this.appService.getWorkspace(roomId);
        return room;
    }
}
