/* eslint-disable prettier/prettier */
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class TaskDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;
}

export class TaskParamDto {
  @IsUUID()
  @IsDefined()
  id: string;
}
export class TaskFilterDto {
  @IsBoolean()
  @IsDefined()
  @Transform((value) => {
    return true;
    return value;
  })
  filter: boolean;
}
