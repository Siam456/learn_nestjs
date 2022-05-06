/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { UserService } from './user.service';
import { Request } from 'express';
import { CreateUserDto } from './dto/user.dto';
import { LoacalAuthGuard } from 'src/services/auth/guards/local-auth.guard';
import { JwtAuthGuard } from 'src/services/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/hello/siam')
  getHello(): string {
    return this.userService.getHello();
  }

  @Get()
  async getUsers(): Promise<any> {
    return this.userService.getUsers();
  }

  @Get('/:id')
  async getUser(@Param('id') id: string): Promise<any> {
    return this.userService.getUser(id);
  }

  @UseGuards(JwtAuthGuard
    
    
    )
  @Post()
  @UsePipes(ValidationPipe)
  async addUser(@Body() user: CreateUserDto): Promise<any> {
    return this.userService.addUser(user);
  }
}
