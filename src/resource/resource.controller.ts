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
import { ApiTags } from '@nestjs/swagger';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { AppResources } from 'src/app.roles';
import { Auth, User } from 'src/common';
import { UserEntity } from 'src/user/user.entity';
import { CreateResourceDto } from './dto/create-resource.dto';
import { ResourceService } from './resource.service';

@ApiTags('Resource')
@Controller('resource')
export class ResourceController {
  constructor(
    private resourceService: ResourceService,
    @InjectRolesBuilder()
    private readonly rolesBuilder: RolesBuilder,
  ) {}
  @Auth({
    possession: 'own',
    action: 'create',
    resource: AppResources.RESOURCE,
  })
  @Post('')
  async createResource(
    @Res() res,
    @Body() body: CreateResourceDto,
    @User() user: UserEntity,
  ) {
    if (
      this.rolesBuilder.can(user.roles).createOwn(AppResources.RESOURCE).granted
    ) {
      const resourceCreated = await this.resourceService.createResource(body);
      return res.status(HttpStatus.OK).json({
        message: 'created',
        resourceCreated,
      });
    } else
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'This is not your resource' });
  }
  @Get('/:idResource')
  async getOneResource(@Res() res, @Param('idResource') idResource: string) {
    const resourceFounded = await this.resourceService.getOneResource(
      idResource,
    );
    if (!resourceFounded) throw new NotFoundException('Not exist');
    return res.status(HttpStatus.OK).json(resourceFounded);
  }
  @Auth({
    possession: 'own',
    action: 'delete',
    resource: AppResources.RESOURCE,
  })
  @Delete('/:idResource')
  async deleteResource(
    @Res() res,
    @Param('idResource') idResource: string,
    @User() user: UserEntity,
  ) {
    if (
      this.rolesBuilder.can(user.roles).deleteOwn(AppResources.RESOURCE).granted
    ) {
      const resourceDeleted = await this.resourceService.deleteResources(
        idResource,
      );
      return res.status(HttpStatus.OK).json({
        message: 'deleted',
        resourceDeleted,
      });
    } else
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'This is not your resource' });
  }
}
