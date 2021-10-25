import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { CourseEntity } from './course.entity';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/common';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
  ) {}
  async createCourse(
    createCourseDto: CreateCourseDto,
    userOwn: UserEntity,
  ): Promise<CourseEntity> {
    console.log(createCourseDto);
    const courseCreated = this.courseRepository.create({
      ...createCourseDto,
      userOwn,
    }); //ram
    const res = await this.courseRepository.save(courseCreated);
    console.log(res);
    return res;
  }
  async getOneCourse(idCourse: string): Promise<CourseEntity> {
    const courseFounded = await this.courseRepository.findOne(idCourse);
    delete courseFounded.idCourse;
    return courseFounded;
  }
  async getAllCourses(): Promise<CourseEntity[]> {
    return await this.courseRepository.find({});
  }
  async getAllStudentsFromCourse(course: string): Promise<UserEntity[]> {
    const students = await this.courseRepository.find({
      relations: ['userStudents'],
      where: { idCourse: course },
    });
    return students[0].userStudents;
  }
  async enrollCourse(
    @User() user: UserEntity,
    course: string,
  ): Promise<CourseEntity> {
    const courseFounded = this.courseRepository.findOne(course);
    const array = await this.courseRepository.find({
      relations: ['userStudents'],
      where: { idCourse: course },
    });
    let userStudents = array[0].userStudents;
    userStudents = [...userStudents, user];
    const courseStudents = Object.assign(courseFounded, {
      userStudents,
    });
    //console.log(array[0].userStudents);
    /*
    let students = array;
    console.log(students);
    if (students) {
      students = [...students, user];
    } else students = [user];
    const courseStudents = Object.assign({
      courseFounded,
      userStudents: students,
    });*/
    //console.log(courseStudents);
    const c = this.courseRepository.create({
      idCourse: course,
      ...courseStudents,
    });
    console.log(c);
    return await this.courseRepository.save(c);
  }
}
