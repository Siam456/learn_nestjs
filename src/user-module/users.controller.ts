/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { string } from 'joi';
import { User } from 'src/database/entity/user.entity';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<any> {
    return this.usersService.findAll();
  }
  @Get('/:id')
  async findUser(@Param('id') id: string): Promise<any> {
    return await this.usersService.findOne(id);
  }
  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<any> {
    return await this.usersService.remove(id);
  }
  @Post()
  async addUser(@Body() body: User): Promise<any> {
    return this.usersService.addUser(body);
  }
  @Put('/:id')
  async updateUser(@Body() body: User, @Param('id') id: string): Promise<any> {
    return this.usersService.updateUser(body, id);
  }
}
