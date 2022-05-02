/* eslint-disable prettier/prettier */

import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class CustomerDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  description: string;

}

export class ParamsDto {
  @IsDefined()
  id: string;
}
