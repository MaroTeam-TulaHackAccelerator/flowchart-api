import { Logger, OnModuleInit } from '@nestjs/common'
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from "@nestjs/websockets";
import { ChatService } from './gateway.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dto/new-message.dto';
import { ChatMessageDto } from './dto/newChatmessage.dto';
import { NewRoomDto } from './dto/newRoom.dto';

@WebSocketGateway()
export class AppGateway implements OnModuleInit {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  private server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: NewMessageDto) {
    this.logger.log(body);
    this.server.to(body.roomId).emit('onMessage', {
      message: "New Message",
      content: body.model,
    })
  }

  @SubscribeMessage('newChatMessage')
  async onNewChatMessage(@MessageBody() message: ChatMessageDto) {
    this.server.to(message.roomId).emit('onChatMessage', message)
    await this.chatService.saveMessage(message)
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
    await this.chatService.saveRoom(body);
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