/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class PetEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'pet_id',
  })
  id: number;

  @Column({
    name: 'pet_name',
    nullable: false,
  })
  name: string;

  @ManyToOne(() => User, (user) => user.pets)
  owner: User;
}
