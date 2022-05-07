/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PetEntity } from 'src/entity/pet.entity';
import { JwtAuthGuard } from 'src/services/auth/guards/jwt-auth.guard';
import { PetDto } from './dto/pet.dto';
import { PetService } from './pet.service';

@Controller('pet')
export class PetController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private readonly petService: PetService) {}

  @Get('/pet/hello')
  getHello(): any {
    return this.petService.getHello();
  }

  @Get()
  async allpets(): Promise<any> {
    return this.petService.getPets();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addPet(@Body() body: PetDto, @Request() req): Promise<any> {
    return this.petService.addPet(body, req.user);
  }

  @Delete('/:id')
  async removePet(@Param('id') id: string): Promise<any> {
    return this.petService.removePet(id);
  }
}
