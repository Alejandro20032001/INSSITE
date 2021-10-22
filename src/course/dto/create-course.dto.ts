import { CourseEnum } from '../enum/course.enum';

export class CreateCourseDto {
  courseNaame: string;
  descriptionCourse: string;
  areaCourse: CourseEnum;
}
