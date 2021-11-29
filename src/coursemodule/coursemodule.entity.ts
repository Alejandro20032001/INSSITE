import { CourseEntity } from '../course/course.entity';
import { ResourceEntity } from '../resource/resource.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('module')
export class CourseModuleEntity {
  @PrimaryGeneratedColumn('uuid')
  idModule?: string;

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
  durationModule: number;
  @Column({
    type: 'integer',
    nullable: false,
  })
  orderModule: number;
  @ManyToOne(() => CourseEntity, (course) => course.modules, {
    eager: true,
  })
  @JoinTable()
  course: CourseEntity;

  @OneToMany(() => ResourceEntity, (resource) => resource.module)
  @JoinTable()
  resources: ResourceEntity[];
}
