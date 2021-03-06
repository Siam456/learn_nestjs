import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Module,
} from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { PetModule } from './pet-module/pet.module';
import { AuthModule } from './services/auth/auth.module';
import { UserModule } from './user-module/user.module';
import * as path from 'path';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    AuthModule,
    PetModule,
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, './uploads');
        },
        filename: (req, file, cb) => {
          const fileExt = path.extname(file.originalname);
          const fileName =
            file.originalname
              .replace(fileExt, '')
              .toLocaleLowerCase()
              .split(' ')
              .join('-') +
            '-' +
            Date.now();

          cb(null, fileName + fileExt);
        },
      }),
      limits: { fileSize: 1000000 },
      fileFilter: (req, file, cb) => {
        if (file.fieldname === 'files' || file.fieldname === 'file') {
          if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
          ) {
            cb(null, true);
          } else {
            cb(
              new HttpException(
                'Only .jpg, .png, .jpeg format allowed!!',
                HttpStatus.INTERNAL_SERVER_ERROR,
              ),
              false,
            );
          }
        } else if (file.fieldname === 'txt') {
          if (file.mimetype === 'text/plain') {
            cb(null, true);
          } else {
            cb(
              new HttpException(
                'Only .txt format allowed!!',
                HttpStatus.INTERNAL_SERVER_ERROR,
              ),
              false,
            );
          }
        }
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
