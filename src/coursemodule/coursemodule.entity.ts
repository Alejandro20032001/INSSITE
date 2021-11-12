import { CourseEntity } from '../course/course.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('module')
export class CourseModuleEntity {
  @PrimaryGeneratedColumn('uuid')

  idModule?: number;

  @Column({
    type: 'varchar',
    length: 1024,
  })
  nameModule: string;
  @Column({
    type: 'varchar',
    length: 1024,
    nullable: false,
  })
  descriptionModule: string;
  @Column({
    type: 'integer',
    nullable: false,
  })
  areaCourse: number;
  
  @ManyToOne(() => CourseEntity, (course) => course.modulescourse, { eager: true })
  @JoinTable()
  modules: CourseEntity;