import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateModuleDto } from './dto/create-module.dto';
import { CourseModuleEntity } from './coursemodule.entity';
import { ResourceEntity } from 'src/resource/resource.entity';

@Injectable()
export class CoursemoduleService {
  constructor(
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
    console.log(resources);
    return resources[0].resources;
  }
}
