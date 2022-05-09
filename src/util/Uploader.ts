/* eslint-disable prettier/prettier */
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './file_ext';

export const Uploader = {
  storage: diskStorage({
    destination: './uploads',
    filename: editFileName,
  }),
  limits: { fileSize: 100000000 },
  fileFilter: imageFileFilter,
};
