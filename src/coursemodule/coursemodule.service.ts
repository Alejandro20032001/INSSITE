import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateModuleDto } from './dto/create-module.dto';
import { CourseModuleEntity } from './coursemodule.entity';
import { ResourceEntity } from 'src/resource/resource.entity';
import { HomeworkEntity } from 'src/homework/homework.entity';
import { ResourceService } from 'src/resource/resource.service';

@Injectable()
export class CoursemoduleService {
  constructor(
    private readonly resourceService: ResourceService,
    @InjectRepository(CourseModuleEntity)
    private readonly coursemoduleRepository: Repository<CourseModuleEntity>,
  ) {}
  async createModule(
    createModuleDto: CreateModuleDto,
  ): Promise<CourseModuleEntity> {
    const moduleCreated = this.coursemoduleRepository.create(createModuleDto);
    return await this.coursemoduleRepository.save(moduleCreated);
  }
  async getOneModule(idModule: string): Promise<CourseModuleEntity> {
    const moduleFounded = await this.coursemoduleRepository.findOne(idModule);
    delete moduleFounded.idModule;
    return moduleFounded;
  }
  async getAllModules(): Promise<CourseModuleEntity[]> {
    return await this.coursemoduleRepository.find({});
  }
  async getResources(module: string): Promise<ResourceEntity[]> {
    const resources = await this.coursemoduleRepository.find({
      relations: ['resources'],
      where: { idModule: module },
    });
    //console.log(resources);
    return resources[0].resources;
  }
  async deleteModule(idModule: string) {
    return await this.coursemoduleRepository.delete(idModule);
  }
  async getHomeworksToDo(idModule: string): Promise<ResourceEntity[]> {
    const homeworks = await this.getResources(idModule);
    const answer = [];
    for (let i = 0; i < (await homeworks).length; i++) {
      if (homeworks[i].resourceType === 'TAREA') answer.push(homeworks[i]);
    }
    return answer;
  }

  async getScorelessHomeworks(idModule: string): Promise<HomeworkEntity[]> {
    const resources = await this.getResources(idModule);
    let resHomeworks = [];
    const answer = [];
    for (let i = 0; i < (await resources).length; i++) {
      if (resources[i].resourceType === 'TAREA'){
        resHomeworks = await this.resourceService.getHomeworks(
          resources[i].idResource,
        );
        for (let j = 0; j < (await resHomeworks).length; j++) {
          if (resHomeworks[j].score == 0) {
            answer.push(resHomeworks[j]);
          }
        }
      }
    }
    return answer;
  }

}
