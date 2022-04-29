import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { TaskModule } from './task-module/task.module';

@Module({
  imports: [TaskModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
