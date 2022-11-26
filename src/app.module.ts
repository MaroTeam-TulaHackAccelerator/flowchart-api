import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from './gateway/gateway.module';
import { WorkspacesController } from './workspaces/workspaces.controller';
import { WorkspacesService } from './workspaces/workspaces.service';

@Module({
  imports: [GatewayModule],
  controllers: [AppController, WorkspacesController],
  providers: [AppService, WorkspacesService]
})
export class AppModule {}
