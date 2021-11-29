import { CourseEntity } from '../../course/course.entity';

export class CreateModuleDto {
  nameModule: string;
  descriptionModule: string;
  durationModule: number;
  course: CourseEntity;
  orderModule: number;
}
