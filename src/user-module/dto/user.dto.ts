/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @MinLength(3)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(3)
  password: string;
}
