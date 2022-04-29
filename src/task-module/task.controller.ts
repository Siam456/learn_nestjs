/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  Post,
  Put,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Task } from './interface/task';
import { TaskService } from './task.service';
import { Request } from 'express';
import { TaskDto, TaskParamDto } from './dto/task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('hello')
  async getHello(): Promise<string> {
    return this.taskService.getHello();
  }
  @Get()
  async getAllTask(): Promise<Task[]> {
    return this.taskService.getTasks();
  }
  @Get(':id')
  async getTask(@Param() reqParam: TaskParamDto): Promise<Task> {
    return this.taskService.getTask(reqParam.id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createTask(@Body() task: TaskDto, @Req() req: Request): Promise<Task> {
    return this.taskService.addTask(task);
  }

  @Delete(':id')
  async deleteTask(@Param() reqParam: TaskParamDto): Promise<Task[]> {
    return this.taskService.deleteTask(reqParam.id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateTask(
    @Param() reqParam: TaskParamDto,
    @Body() reqBody: TaskDto,
  ): Promise<Task[]> {
    return this.taskService.updateTask(reqParam.id, reqBody.name);
  }

  //filter task
  @Get('/filter/data')
  async filterTask(@Query('filter') filter: ParseBoolPipe): Promise<Task[]> {
    return this.taskService.filterTask(filter);
  }
}
