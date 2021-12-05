import { ResourceEntity } from '../resource/resource.entity';
import { UserEntity } from '../user/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('homework')
export class HomeworkEntity {
  @PrimaryGeneratedColumn('uuid')
  idHomework?: string;

  @Column({
    type: 'varchar',
    length: 1000,
  })
  content: string;

  @Column({
    type: 'integer',
    nullable: true,
  })
  score?: number;

  @ManyToOne(() => ResourceEntity, (resource) => resource.homeworks, {
    eager: true,
  })
  @JoinTable()
  resource: ResourceEntity;

  @ManyToOne(() => UserEntity, (user) => user.homeworks, { eager: true })
  @JoinTable()
  userDone: UserEntity;
}
