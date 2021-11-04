import { UserEntity } from 'src/user/user.entity';
import { CourseEnum } from '../enum/course.enum';

export class CreateCourseDto {
  courseName: string;
  descriptionCourse: string;
  areaCourse: CourseEnum;
}
