//import { CourseModuleEntity } from '../../coursemodule/coursemodule.entity';
//import { CourseEntity } from '../../course/course.entity';
//import { UserEntity } from '../../user/user.entity';
export class CreateHomeworkDto {
  idStudent: string;
  idResource: string;
  idCourse: string;
  content: string;
  score: number;
}
