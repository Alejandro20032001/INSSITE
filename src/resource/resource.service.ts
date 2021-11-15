import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
}
