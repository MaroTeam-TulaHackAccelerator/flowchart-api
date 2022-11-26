import { Logger, OnModuleInit } from '@nestjs/common'
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from "@nestjs/websockets";

import { Server, Socket } from 'socket.io';
import { INewMessageDto } from 'src/gateway/dto/new-message.dto';

@WebSocketGateway()
export class AppGateway implements OnModuleInit {
  @WebSocketServer()
  private server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: INewMessageDto) {
    this.logger.log(body);
    this.server.to(body.roomId).emit('onMessage', {
      message: "New Message",
      content: body.model
    })
  }
  
  @SubscribeMessage('joinToRoom')
  joinToRoom(@MessageBody() roomId: string, @ConnectedSocket() client: Socket){
    this.logger.log(roomId);
    client.join(roomId)
    this.logger.log(`Client ${client.id}, joined to room: ${roomId}`);
    this.server.to(roomId).emit('onJoin', {
      message: `Client ${client.id} has been joined`
    });
  }

  @SubscribeMessage('createRoom')
  createRoom(@MessageBody() roomId: string, @ConnectedSocket() client: Socket){
    client.join(`${roomId}`);
    this.logger.log((roomId));
    this.logger.log(`Client ${client.id}, created room: ${roomId}`);
    this.server.to(roomId).emit('onCreate', {
      message: `Client ${client.id}, created room: ${roomId}`
    })
  }

  onModuleInit() {
    this.server.on('connection', socket => {
      this.logger.log((socket.id));
      this.logger.log(`Client ${socket.id} has been connected`);
    })
  }
}