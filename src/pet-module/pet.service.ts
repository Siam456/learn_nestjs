/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, UploadedFiles } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { PetEntity } from 'src/entity/pet.entity';
import { Repository } from 'typeorm';
import { PetDto } from './dto/pet.dto';

@Injectable()
export class PetService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    @InjectRepository(PetEntity)
    private petRepository: Repository<PetEntity>,
  ) {}

  async getHello(): Promise<any> {
    return 'Hello from pet!!';
  }

  async getPets(): Promise<any> {
    return await this.petRepository.find({
      relations: ['owner'],
    });
  }

  async getPet(id: string): Promise<any> {
    return await this.petRepository.findOne(id);
  }

  async addPet(pet: PetDto, user: any, files: any): Promise<any> {
    // newPet.ownerId = user.id;
    // console.log(files);
    const photo = [];

    files.forEach((element: any) => {
      photo.push(element.filename);
    });

    const newPet = {
      ...pet,
      owner: user,
      photo: photo,
    };

    const response = await this.petRepository.save(newPet);

    if (response) {
      return pet;
    } else {
      throw new BadRequestException('');
    }
  }

  async removePet(id: string): Promise<any> {
    return this.petRepository
      .createQueryBuilder()
      .delete()
      .from(PetEntity)
      .where('id = :id', { id: id })
      .execute();
  }
}
