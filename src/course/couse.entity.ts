import { hash } from 'bcryptjs';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseEnum } from './enum/course.enum';

@Entity('course')
export class CourseEntity {
  @PrimaryGeneratedColumn('uuid')
  idCourse?: string;
  @Column({
    type: 'integer',
  })
  courseName: string;
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  descriptionCourse: string;
  @Column({
    type: 'varchar',
    length: 1024,
    nullable: false,
  })
  areaCourse: string; //auth
  @Column({
    type: 'enum',
    enum: CourseEnum,
  })
  userRoll: CourseEnum;

  //Requiere before insert y before update???
}
