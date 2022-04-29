/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Task } from './interface/task';
import { TaskStoreService } from './task-store.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TaskService {
  constructor(private readonly taskStoreService: TaskStoreService) {}

  //   retrive task
  getHello(): string {
    return 'Hello World!';
  }

  // add a task
  public async addTask(task: Task): Promise<Task> {
    task.uuid = uuidv4();
    task.compledted = false;
    task.description = 'dummy';
    task.ownder = 'siam';
    task.duration = 2;

    return this.taskStoreService.addTask(task);
  }

  // retrive all task
  public async getTasks(): Promise<Task[]> {
    return await this.taskStoreService.getTasks();
  }

  // retrive a task
  public async getTask(id: string): Promise<Task> {
    return await this.taskStoreService.getTask(id);
  }

  // delete a task
  public async deleteTask(id: string): Promise<Task[]> {
    return await this.taskStoreService.deleteTask(id);
  }

  //update a task
  public async updateTask(id: string, taskName: string): Promise<Task[]> {
    return await this.taskStoreService.updateTask(id, taskName);
  }

  public async filterTask(filter): Promise<Task[]> {
    return await this.taskStoreService.filter(filter);
  }
}
