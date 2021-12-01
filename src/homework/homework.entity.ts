import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('homework')
export class HomeworkEntity {
  @PrimaryGeneratedColumn('uuid')
  idHomework?: string;
  @Column({
    type: 'varchar',
    length: 255,
  })
  
 
