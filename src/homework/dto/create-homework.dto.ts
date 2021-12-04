//import { CourseModuleEntity } from '../../coursemodule/coursemodule.entity';
//import { CourseEntity } from '../../course/course.entity';

import { ResourceEntity } from '../../resource/resource.entity';

//import { UserEntity } from '../../user/user.entity';
export class CreateHomeworkDto {
  resource: ResourceEntity;
  content: string;
}
