import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HomeworkEntity } from 'src/homework/homework.entity';
import { Repository } from 'typeorm';
import { CreateResourceDto } from './dto/create-resource.dto';
import { ResourceEntity } from './resource.entity';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(ResourceEntity)
    private readonly resourceRepository: Repository<ResourceEntity>,
  ) {}
  async createResource(
    createResourceDto: CreateResourceDto,
  ): Promise<ResourceEntity> {
    const resourceCreated = await this.resourceRepository.create(
      createResourceDto,
    );
    return await this.resourceRepository.save(resourceCreated);
  }
  async deleteResources(idResource: string) {
    return await this.resourceRepository.delete(idResource);
  }
  async getOneResource(idResource: string) {
    const resourceFounded = await this.resourceRepository.findOne(idResource);
    delete resourceFounded.idResource;
    return resourceFounded;
  }
  async getHomeworks(idResource: string): Promise<HomeworkEntity[]> {
    const actualResource = await this.getOneResource(idResource);
    if ((await actualResource).resourceType === 'TAREA') {
      const homeworks = await this.resourceRepository.find({
        relations: ['homeworks'],
        where: { idResource },
      });
      return homeworks[0].homeworks;
    }
  }
}
