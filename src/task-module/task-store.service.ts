/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './interface/task';

@Injectable()
export class TaskStoreService {
  public tasks: Task[] = [];

  //   retrive task
  getHello(): string {
    return 'Hello World!';
  }

  // add a task
  public async addTask(task: Task): Promise<Task> {
    this.tasks.push(task);
    return Promise.resolve(task);
  }

  // retrive all task
  public async getTasks(): Promise<Task[]> {
    return Promise.resolve(this.tasks);
  }

  // retrive a task
  public async getTask(id: string): Promise<Task> {
    const task = this.tasks.filter((i) => i.uuid === id);
    if (task && task.length > 0) {
      return Promise.resolve(task[0]);
    }
    throw new NotFoundException('task not found');
  }

  // delete a task
  public async deleteTask(id: string): Promise<Task[]> {
    try {
      const newTask = this.tasks.filter((i) => i.uuid !== id);
      this.tasks = newTask;
      return Promise.resolve(newTask);
    } catch (err) {
      throw err;
    }
  }

  //update specific task
  async updateTask(id: string, taskName: string): Promise<Task[]> {
    let task: Task = { name: '' };
    task = this.tasks.filter((i) => i.uuid === id)[0];
    if (task) {
      task.name = taskName;

      const newTaskList = this.tasks.filter((i) => {
        if (i.uuid === id) {
          return task;
        }
        return i;
      });
      return Promise.resolve(newTaskList);
    }
    throw new NotFoundException('task not exist');
  }

  //filter from query param
  public async filter(filter): Promise<Task[]> {
    if (filter === 'true') {
      return Promise.resolve(this.tasks);
    }
    throw new NotFoundException('query should be true');
  }
}
