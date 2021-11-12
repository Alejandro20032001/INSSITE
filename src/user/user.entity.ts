import { hash } from 'bcryptjs';
import { CourseEntity } from 'src/course/course.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEnum } from './enum/user.enum';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  idUser?: string;
  @Column({
    type: 'varchar',
    length: 255,
  })
  completeName: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  username: string;
  @Column({
    type: 'varchar',
    length: 255,
    select: false,
    nullable: false,
  })
  password: string; //auth
  @Column({
    type: 'simple-array',
    nullable: false,
  })
  roles: UserEnum[];

  @BeforeInsert()
  @BeforeUpdate()
  async hasPassword() {
    if (!this.password) {
      return;
    }
    this.password = await hash(this.password, 10);
  }
  @ManyToMany(() => CourseEntity, (course) => course.userStudents)
  courses: CourseEntity[];
  
  @OneToMany(() => CourseEntity, (course) => course.userOwn)
  coursesCreated: CourseEntity[];
}
