import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Module,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { CoursemoduleService } from './coursemodule.service';
import { CourseEntity } from 'src/course/course.entity';
import { ApiTags } from '@nestjs/swagger';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { AppResources } from 'src/app.roles';

@ApiTags('Module')
@Controller('coursemodule')
export class CoursemoduleController {
  constructor(
    private coursemoduleService: CoursemoduleService,
    @InjectRolesBuilder()
    private readonly rolesBuilder: RolesBuilder,
  ) {}
 
  @Post('')
  async createModule(
    @Res() res,
    @Body() body: CreateModuleDto,
    @Course() courseOwn: CourseEntity,
  ) {
    const moduleCreated = await this.coursemoduleService.createModule(body, courseOwn);
    return res.status(HttpStatus.OK).json({
      massage: 'created',
      moduleCreated,
    });
  }
  @Get('/:idModule')
  async getModule(@Res() res, @Param('idModule') idModule: number) {
    const moduleFounded = await this.coursemoduleService.getOneModule(idModule);
    if (!moduleFounded) throw new NotFoundException('Not exist');
    return res.status(HttpStatus.OK).json(moduleFounded);
  }

  @Get('')
  async getAllModules(@Res() res) {
    const modulesFounded = await this.coursemoduleService.getAllModules();
    return res.status(HttpStatus.OK).json(modulesFounded);
  }
  
  @Get('/modules/:idCourse')
  async getModulesFromCourse(@Res() res, @Param('idCourse') idCourse: string) {
    const students = await this.coursemoduleService.getAllModulesFromCourse(
      idCourse,
    );
    return res.status(HttpStatus.OK).json(students);
  }

}
