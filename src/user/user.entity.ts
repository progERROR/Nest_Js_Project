import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './role.enum';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column({
    unique: true,
  })
  public email: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  public role: Role;

  @Column()
  @Exclude()
  public password: string;

  @Exclude()
  @CreateDateColumn()
  public createdDate: Date;

  @Exclude()
  @UpdateDateColumn()
  public updatedDate: Date;
}
