import {
  Body,
  Controller,
  Delete,
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
import { Auth, User } from 'src/common';
import { UserEntity } from 'src/user/user.entity';
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
  async createModule(@Res() res, @Body() body: CreateModuleDto) {
    const moduleCreated = await this.coursemoduleService.createModule(body);
    return res.status(HttpStatus.OK).json({
      message: 'created',
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
  @Auth({
    possession: 'own',
    action: 'delete',
    resource: AppResources.MODULE,
  })
  @Delete('/:idModule')
  async deleteResource(
    @Res() res,
    @Param('idModule') idModule: string,
    @User() user: UserEntity,
  ) {
    if (
      this.rolesBuilder.can(user.roles).deleteOwn(AppResources.MODULE).granted
    ) {
      const moduleDeleted = await this.coursemoduleService.deleteModule(
        idModule,
      );
      return res.status(HttpStatus.OK).json({
        message: 'deleted',
        moduleDeleted,
      });
    } else
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'This is not your resource' });
  }
}
