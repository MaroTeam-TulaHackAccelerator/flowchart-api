import { Logger, OnModuleInit } from '@nestjs/common'
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from "@nestjs/websockets";

import { Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnModuleInit {
  @WebSocketServer()
  private server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    this.logger.log(body);
    this.server.emit('onMessage', {
      message: "New Message",
      content: body,
    })
  }

  onModuleInit() {
    this.server.on('connection', socket => {
      this.logger.log(`Client connected: ${socket.id}`);
    })
  }
}