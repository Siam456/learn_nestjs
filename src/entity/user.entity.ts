/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PetEntity } from './pet.entity';

export enum UserRole {
  admin = 'admin',
  user = 'user',
  ghost = 'ghost',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
  })
  id: number;

  @Column({
    name: 'name',
    nullable: false,
    default: '',
  })
  name: string;

  @Column({
    name: 'email',
    nullable: false,
    default: '',
  })
  email: string;

  @Column({
    name: '',
    nullable: false,
    default: '',
  })
  password: string;

  @Column({
    name: 'role',
    type: 'enum',
    enum: UserRole,
    default: UserRole.user,
  })
  role: string;

  @OneToMany(() => PetEntity, (pet) => pet.owner)
  pets: PetEntity[];
}
