//import { CourseModuleEntity } from '../../coursemodule/coursemodule.entity';
//import { CourseEntity } from '../../course/course.entity';
//import { UserEntity } from '../../user/user.entity';
export class CreateHomeworkDto {
  idstudent: string;
  idteacher: string;
  idcourse: string;
  score: number;
}
