import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { ResourceService } from './resource.service';

@Controller('resource')
export class ResourceController {
  constructor(private resourceService: ResourceService) {}
  @Post()
  async createResource(@Res() res, @Body() body: CreateResourceDto){
  }
}
