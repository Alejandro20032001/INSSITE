import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { HomeworkEntity } from './homework.entity';
import { UserEntity } from 'src/user/user.entity';
@Injectable()
export class HomeworkService {
  constructor(
    @InjectRepository(HomeworkEntity)
    private readonly homeworkRepository: Repository<HomeworkEntity>,
  ) {}
  async createHomework(
    createHomeworkDto: CreateHomeworkDto,
    userDone: UserEntity,
  ): Promise<HomeworkEntity> {
    const homeworkCreated = this.homeworkRepository.create({
      userDone,
      ...createHomeworkDto,
    });
    const res = await this.homeworkRepository.save(homeworkCreated);
    return res;
  }
  //async getOneHomework(idHomework: string): Promise<HomeworkEntity> {}

  async getAllHomeworks(): Promise<HomeworkEntity[]> {
    return await this.homeworkRepository.find({});
  }

  async setHomeworkScore(idHomework: string, score: number) {
    return await this.homeworkRepository.update({ idHomework }, { score });
  }

 
}
