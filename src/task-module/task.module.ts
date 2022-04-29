/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TaskStoreService } from './task-store.service';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [],
  controllers: [TaskController],
  providers: [TaskService, TaskStoreService],
})
export class TaskModule {}
