import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { CourseEntity } from './course.entity';
import { UserEntity } from 'src/user/user.entity';
import { User } from 'src/common';
import { CourseModuleEntity } from 'src/coursemodule/coursemodule.entity';

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
    const courseCreated = this.courseRepository.create({
      ...createCourseDto,
      userOwn,
    }); //ram
    const res = await this.courseRepository.save(courseCreated);
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
    const c = this.courseRepository.create({
      idCourse: course,
      ...courseStudents,
    });
    return await this.courseRepository.save(c);
  }
  async getAllCoursesFromTeacher(idTeacher: string) {
    return await this.courseRepository.find({ where: { userOwn: idTeacher } });
  }
  async getAllModulesFromThisCourse(
    course: string,
  ): Promise<CourseModuleEntity[]> {
    const modules = await this.courseRepository.find({
      relations: ['modules'],
      where: { idCourse: course },
    });
    return modules[0].modules;
  }
}
