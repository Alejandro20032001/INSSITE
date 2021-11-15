import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { CoursemoduleService } from './coursemodule.service';
import { ApiTags } from '@nestjs/swagger';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';

@ApiTags('Module')
@Controller('coursemodule')
export class CoursemoduleController {
  constructor(
    private coursemoduleService: CoursemoduleService,
    @InjectRolesBuilder()
    private readonly rolesBuilder: RolesBuilder,
  ) {}

  @Post('')
  async createModule(@Res() res, @Body() body: CreateModuleDto) {
    const moduleCreated = await this.coursemoduleService.createModule(body);
    return res.status(HttpStatus.OK).json({
      massage: 'created',
      moduleCreated,
    });
  }
  @Get('/:idModule')
  async getModule(@Res() res, @Param('idModule') idModule: string) {
    const moduleFounded = await this.coursemoduleService.getOneModule(idModule);
    if (!moduleFounded) throw new NotFoundException('Not exist');
    return res.status(HttpStatus.OK).json(moduleFounded);
  }

  @Get('')
  async getAllModules(@Res() res) {
    const modulesFounded = await this.coursemoduleService.getAllModules();
    return res.status(HttpStatus.OK).json(modulesFounded);
  }
  @Get('/resources/:idModule')
  async getResources(@Res() res, @Param('idModule') idModule: string) {
    const resources = await this.coursemoduleService.getResources(idModule);
    return res.status(HttpStatus.OK).json(resources);
  }
}
