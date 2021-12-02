import { ResourceEntity } from '../resource/resource.entity';
import { UserEntity } from '../user/user.entity';
import { CourseEntity } from '../course/course.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToOne,
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
  idStudent?: string;
  @Column({
    type: 'varchar',
    length: 255,
  })
  idResource?: string;
  @Column({
    type: 'varchar',
    length: 255,
  })
  idCourse?: string;
  @Column({
    type: 'varchar',
    length: 255,
  })
  content?: string;
  @Column({
    type: 'varchar',
    length: 1000,
  })
  score?: number;
  @Column({
    type: 'integer',
    nullable: false,
  })
  @OneToOne(() => UserEntity, (user) => user.homework, { eager: true })
  @JoinTable()
  userDone: UserEntity;
  @ManyToOne(() => ResourceEntity, (resource) => resource.homeworks, {
    eager: true,
  })
  @JoinTable()
  resource: ResourceEntity;
  @ManyToOne(() => CourseEntity, (course) => course.homeworks, { eager: true })
  @JoinTable()
  course: ResourceEntity;
}
