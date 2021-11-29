import { CourseEnum } from '../enum/course.enum';

export class CreateCourseDto {
  courseName: string;
  descriptionCourse: string;
  areaCourse: string;
  dateStartCourse: Date;
  dateStartEnrole: Date;
}
