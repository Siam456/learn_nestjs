/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Module({
  imports: [
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
  controllers: [],
  providers: [],
})
export class FileUploader {}
