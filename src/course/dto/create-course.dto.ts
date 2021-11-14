import { CourseEnum } from '../enum/course.enum';

export class CreateCourseDto {
  courseName: string;
  descriptionCourse: string;
  areaCourse: CourseEnum;
  dateStartCourse: Date;
  dateStartEnrole: Date;
}
