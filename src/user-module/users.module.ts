/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entity/user.entity';

import { UserSchema } from './user.schema';

@Module({
  imports: [TypeOrmModule.forFeature([User])],

  exports: [TypeOrmModule],
})
export class UsersModule {}
