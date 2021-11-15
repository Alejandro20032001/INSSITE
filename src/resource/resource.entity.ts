import { CourseModuleEntity } from '../coursemodule/coursemodule.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ResourceEnum } from './enum/resource.enum';

@Entity('resource')
export class ResourceEntity {
  @PrimaryGeneratedColumn('uuid')
  idResource?: string;
  @Column({
    type: 'enum',
    enum: ResourceEnum,
  })
  resourceType: ResourceEnum;
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
  content: string;
  @Column({
    type: 'varchar',
    nullable: true,
  })
  ruteDocuments: string;
  @ManyToOne(() => CourseModuleEntity, (module) => module.resources, {
    eager: true,
  })
  @JoinTable()
  module: CourseModuleEntity;
}
