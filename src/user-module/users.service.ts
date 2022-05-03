/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async addUser(body: User): Promise<User> {
    const response = await this.usersRepository.save(body);
    return response;
  }
  async updateUser(body: User, id: any): Promise<any> {
    const response = await this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set(body)
      .where('id = :id', { id: id })
      .execute();
    return response;
  }
}
