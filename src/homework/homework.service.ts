import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { HomeworkEntity } from './homework.entity';
import { ResourceEntity } from 'src/resource/resource.entity';
import { UserEntity } from 'src/user/user.entity';
@Injectable()
export class HomeworkService {
  constructor(
    @InjectRepository(HomeworkEntity)
    private readonly homeworkRepository: Repository<HomeworkEntity>,
    private readonly resourceRepository: Repository<ResourceEntity>,
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async createHomework(
    createHomeworkDto: CreateHomeworkDto,
    userDone: UserEntity,
  ): Promise<HomeworkEntity> {
    const homeworkCreated = this.homeworkRepository.create({
      ...createHomeworkDto,
      userDone,
    });
    const res = await this.homeworkRepository.save(homeworkCreated);
    return res;
  }
  //async getOneHomework(idHomework: string): Promise<HomeworkEntity> {}

  async getAllHomeworks(): Promise<HomeworkEntity[]> {
    return await this.homeworkRepository.find({});
  }
  async getAllHomeworksFromResource(
    resource: string,
  ): Promise<HomeworkEntity[]> {
    const homeworks = await this.resourceRepository.find({
      relations: ['homeworks'],
      where: { idResource: resource },
    });
    return homeworks[0].homeworks;
  }
  async getHomeworkFromStudent(student: string): Promise<UserEntity> {
    const homeworks = await this.userRepository.findOne(student);
    return homeworks;
  }
  
}
