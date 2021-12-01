//import { CourseModuleEntity } from '../../coursemodule/coursemodule.entity';
//import { CourseEntity } from '../../course/course.entity';
//import { UserEntity } from '../../user/user.entity';
export class CreateHomeworkDto {
  id_student: string;
  id_teacher: string;
  id_course: string;
  score: number;
}
