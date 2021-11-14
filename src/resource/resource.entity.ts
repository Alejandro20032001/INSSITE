import { CourseModuleEntity } from '../coursemodule/coursemodule.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('resource')
export class ResourceEntity {
  @PrimaryGeneratedColumn('uuid')
  idResource?: string;

  @Column({
    type: 'varchar',
    length: 64,
  })
  title: string;
  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  descriptionResource: string;
  @Column({
    type: 'varchar',
    nullable: true,
  })
  resourceContent: number;

  @ManyToOne(() => CourseModuleEntity, (moduleR) => moduleR.resources, {
    eager: true,
  })
  @JoinTable()
  module: CourseModuleEntity;
}