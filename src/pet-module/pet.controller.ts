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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { PetEntity } from 'src/entity/pet.entity';
import { JwtAuthGuard } from 'src/services/auth/guards/jwt-auth.guard';
import { editFileName, imageFileFilter } from 'src/util/file_ext';
import { Uploader } from 'src/util/Uploader';
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
  @UseInterceptors(FilesInterceptor('files', 3, Uploader))
  @Post()
  async addPet(
    @Body() body: PetDto,
    @Request() req,
    @UploadedFiles()
    files: {
      files?: Express.Multer.File[];
    },
  ): Promise<any> {
    // console.log(body);

    return this.petService.addPet(body, req.user, files);
  }

  @Delete('/:id')
  async removePet(@Param('id') id: string): Promise<any> {
    return this.petService.removePet(id);
  }
}
