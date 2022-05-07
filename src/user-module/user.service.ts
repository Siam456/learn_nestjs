/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getHello(): string {
    return 'Hello World! from user';
  }

  async getUsers(): Promise<any> {
    return await this.usersRepository.find({
      relations: ['pets'],
    });
  }

  async getUser(id: string): Promise<any> {
    return await this.usersRepository.findOne(id);
  }
  async getUserByNameOrEmail(searchKey: string): Promise<any> {
    return await this.usersRepository.findOne({
      where: [{ name: searchKey }, { email: searchKey }],
    });
  }

  async addUser(user: CreateUserDto): Promise<any> {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(user.password, salt);

    const response = await this.usersRepository.save({ ...user, password });

    if (response) {
      return user;
    } else {
      throw new BadRequestException('');
    }
  }
}
