import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TodoEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column({ type: 'timestamp', nullable: true })
  public endDate: Date;

  @Column({ default: true })
  public isActive: boolean;

  @Exclude()
  @CreateDateColumn()
  public createdDate: Date;

  @Exclude()
  @UpdateDateColumn()
  public updatedDate: Date;
}
