import { UserEntity } from '../user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseEnum } from './enum/course.enum';

@Entity('course')
export class CourseEntity {
  @PrimaryGeneratedColumn('uuid')
  idCourse?: string;
  @Column({
    type: 'varchar',
    length: 255,
  })
  courseName: string;
  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  descriptionCourse: string;
  @Column({
    type: 'enum',
    nullable: false,
    enum: CourseEnum,
  })
  areaCourse: CourseEnum;
  /*@Column({
    type: 'timestamp',
  })
  dateStartCourse: Date;
  @Column({
    type: 'timestamp',
  })
  dateStartEnrole: Date;
  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamp',
  })
  createAt: Date;*/
  @ManyToMany(() => UserEntity, (user) => user.courses)
  @JoinTable()
  userStudents: UserEntity[];
  @ManyToOne(() => UserEntity, (user) => user.courses, { eager: true })
  @JoinTable()
  userOwn: UserEntity;
}