import { Logger, OnModuleInit } from '@nestjs/common'
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from "@nestjs/websockets";

import { Server, Socket } from 'socket.io';
import { IGoJsModel } from 'src/models/igo-Js.model';

@WebSocketGateway()
export class AppGateway implements OnModuleInit {
  @WebSocketServer()
  private server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    this.logger.log(body);
    this.server.to(body.conn).emit('onMessage', {
      message: "New Message",
      content: body.msg
    })
  }
  
  @SubscribeMessage('joinToRoom')
  joinToRoom(@MessageBody() body: string, @ConnectedSocket() client: Socket){
    this.logger.log(body);
    client.join(body)
    this.logger.log(`Client ${client.id}, joined to room: ${client.rooms.has(body) ? body : undefined}`);
    this.server.to(body).emit('onJoin', {
      message: `Client ${client.id} has been joined`
    });
  }

  onModuleInit() {
    this.server.on('connection', socket => {
      socket.join(`${socket.id}`);
      this.logger.log((socket.id));
      this.logger.log(`Client ${socket.id}, joined to room: ${socket.rooms.has(socket.id) ? socket.id : undefined}`);
    })
  }
}