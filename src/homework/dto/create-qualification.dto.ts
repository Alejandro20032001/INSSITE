import { HomeworkEntity } from '../../homework/homework.entity';
export class CreateQualificationDto {
  homework: HomeworkEntity;
  score: number;
}