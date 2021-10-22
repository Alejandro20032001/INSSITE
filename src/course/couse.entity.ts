import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
    length: 50,
    nullable: false,
  })
  descriptionCourse: string;
  @Column({
    type: 'enum',
    nullable: false,
    enum: CourseEnum,
  })
  areaCourse: CourseEnum;
  @Column({
    type: 'timestamp',
  })
  dateStartCourse: Date;
  @Column({
    type: 'timestamp',
  })
  dateStarEnrole: Date;
  @ManyToOne(() => UserEntity, (user) => user.courses)
  user = UserEntity;
}
