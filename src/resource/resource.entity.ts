import { CourseModuleEntity } from '../coursemodule/coursemodule.entity';
import { HomeworkEntity } from 'src/homework/homework.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
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
    nullable: true,
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
    type: 'timestamp',
    nullable: true,
  })
  date: Date;

  @Column({
    type: 'int',
    nullable: true,
  })
  score: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  ruteDocuments: string;

  @ManyToOne(() => CourseModuleEntity, (module) => module.resources, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinTable()
  module: CourseModuleEntity;

  @OneToMany(() => HomeworkEntity, (homework) => homework.resource)
  @JoinTable()
  homeworks: HomeworkEntity[];

  @Column({
    type: 'integer',
    nullable: false,
    default: 0,
  })
  orderResource: number;
}
