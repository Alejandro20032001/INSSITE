import { ResourceEntity } from '../../resource/resource.entity';
export class CreateHomeworkDto {
  resource: ResourceEntity;
  content: string;
}
