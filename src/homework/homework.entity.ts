import { ResourceEntity } from '../resource/resource.entity';
import { UserEntity } from '../user/user.entity';
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
  /*@Column({
    type: 'varchar',
    length: 255,
  })
  idCourse?: string;*/
  @Column({
    type: 'varchar',
    length: 255,
  })
  content: string;

  @Column({
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  score?: number;

  @ManyToOne(() => ResourceEntity, (resource) => resource.homeworks, {
    eager: true,
  })
  @JoinTable()
  resource: ResourceEntity;

  @ManyToOne(() => UserEntity, (user) => user.homeworks, { eager: true })
  @JoinTable()
  userDone: UserEntity;
  /*@ManyToOne(() => CourseEntity, (course) => course.homeworks, { eager: true })
  @JoinTable()
  course: ResourceEntity;*/
}
