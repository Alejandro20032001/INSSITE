import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateModuleDto } from './dto/create-module.dto';
import { CourseModuleEntity } from './coursemodule.entity';
import { CourseEntity } from 'src/course/course.entity';
import { Course } from 'src/common';

@Injectable()
export class CoursemoduleService {
  constructor(
    @InjectRepository(CourseModuleEntity)
    private readonly coursemoduleRepository: Repository<CourseModuleEntity>,
  ) {}
  async createModule(
    createModuleDto: CreateModuleDto,
    courseOwn: CourseEntity,
  ): Promise<CourseModuleEntity> {
    const moduleCreated = this.coursemoduleRepository.create({
      ...createModuleDto,
      courseOwn,
    });
    const res = await this.coursemoduleRepository.save(moduleCreated);
    return res;
  }
  async getOneModule(idModule: number): Promise<CourseModuleEntity> {
    const moduleFounded = await this.coursemoduleRepository.findOne(idModule);
    delete moduleFounded.idModule;
    return moduleFounded;
  }
  async getAllModules(): Promise<CourseModuleEntity[]> {
    return await this.coursemoduleRepository.find({});
  }
  async getAllModulesFromCourse(course: string): Promise<CourseModuleEntity[]> {
    const modules = await this.coursemoduleRepository.find({
      relations: ['courseModules'],
      where: { idCourse: course},
    });
    return modules[0].modulescourse;
  }
}
