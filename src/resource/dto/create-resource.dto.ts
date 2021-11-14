import { CourseModuleEntity } from '../../coursemodule/coursemodule.entity';
export class CreateResourceDto {
  title: string;
  descriptionResource: string;
  content: string;
  module: CourseModuleEntity;
}
