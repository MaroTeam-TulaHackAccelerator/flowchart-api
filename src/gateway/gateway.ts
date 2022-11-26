import { Logger, OnModuleInit } from '@nestjs/common'
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from "@nestjs/websockets";
import { GatewayService } from './gateway.service';
import { Server, Socket } from 'socket.io';
import { NewStateDto } from '../gateway/dto/new-state.dto';
import { ChatMessageDto } from '../dto/newChatmessage.dto';
import { NewRoomDto } from '../dto/newRoom.dto';

@WebSocketGateway()
export class AppGateway implements OnModuleInit {
  constructor(private readonly gatewayService: GatewayService) {}

  @WebSocketServer()
  private server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('newState')
  async onNewState(@MessageBody() body: NewStateDto) {
    this.logger.log(body);
    this.server.to(body.roomId).emit('onStateChanged', body);
    await this.gatewayService.saveState(body);
  }

  @SubscribeMessage('newChatMessage')
  async onNewChatMessage(@MessageBody() message: ChatMessageDto) {
    this.server.to(message.roomId).emit('onChatMessage', message)
    await this.gatewayService.saveMessage(message)
  }
  
  @SubscribeMessage('joinToRoom')
  joinToRoom(@MessageBody() roomId: string, @ConnectedSocket() client: Socket){
    this.logger.log(roomId);
    client.join(roomId);
    this.logger.log(`Client ${client.id}, joined to room: ${roomId}`);
    this.server.to(roomId).emit('onJoin', {
      message: `Client ${client.id} has been joined`,
    });
  }

  @SubscribeMessage('createRoom')
  async createRoom(@MessageBody() body: NewRoomDto, @ConnectedSocket() client: Socket){
    client.join(`${body.roomId}`);
    this.logger.log(`Client ${client.id}, created room: ${body.roomId}`);
    await this.gatewayService.saveRoom(body);
    this.server.to(body.roomId).emit('onCreate', {
      message: `Client ${client.id}, created room: ${body.roomId}`,
    });
  }

  onModuleInit() {
    this.server.on('connection', socket => {
      this.logger.log(`Client ${socket.id} has been connected`);
    })
  }
}