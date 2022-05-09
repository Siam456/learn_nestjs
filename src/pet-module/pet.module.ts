/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { diskStorage } from 'multer';
import { PetEntity } from 'src/entity/pet.entity';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';
import * as path from 'path';

@Module({
  imports: [TypeOrmModule.forFeature([PetEntity])],

  controllers: [PetController],
  providers: [PetService],
  exports: [PetService],
})
export class PetModule {}
