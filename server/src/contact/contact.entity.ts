import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

@Entity()
export class Contact extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MinLength(1)
  @IsString()
  name: string;

  @Column()
  @MinLength(1)
  @IsString()
  email: string;

  @Column()
  @MinLength(1)
  @IsString()
  contact_no: string;

  @Column()
  @MinLength(1)
  @IsString()
   query: string;
}