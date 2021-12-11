import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { CourseService } from './course.service';
import { Auth, User } from '../common/index';
import { UserEntity } from 'src/user/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { AppResources } from 'src/app.roles';

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(
    private courseService: CourseService,
    @InjectRolesBuilder()
    private readonly rolesBuilder: RolesBuilder,
  ) {}
  @Auth({
    possession: 'own',
    action: 'create',
    resource: AppResources.COURSE,
  })
  @Post('')
  async createCourse(
    @Res() res,
    @Body() body: CreateCourseDto,
    @User() userOwn: UserEntity,
  ) {
    const courseCreated = await this.courseService.createCourse(body, userOwn);
    return res.status(HttpStatus.OK).json({
      message: 'created',
      courseCreated,
    });
  }
  @Get('/:idCourse')
  async getCourse(@Res() res, @Param('idCourse') idCourse: string) {
    const courseFounded = await this.courseService.getOneCourse(idCourse);
    if (!courseFounded) throw new NotFoundException('Not exist');
    return res.status(HttpStatus.OK).json(courseFounded);
  }

  @Get('')
  async getAllCourses(@Res() res) {
    const coursesFounded = await this.courseService.getAllCourses();
    return res.status(HttpStatus.OK).json(coursesFounded);
  }
  @Auth({
    possession: 'any',
    action: 'update',
    resource: AppResources.COURSE,
  })
  @Put('/:idCourse')
  async enrollCourse(
    @Res() res,
    @Param('idCourse') idCourse: string,
    @User() user: UserEntity,
  ) {
    if (
      this.rolesBuilder.can(user.roles).updateAny(AppResources.COURSE).granted
    ) {
      const newCourse = await this.courseService.enrollCourse(user, idCourse);
      return res.status(HttpStatus.OK).json(newCourse);
    } else
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'Not an estudent' });
  }
  @Auth()
  @Get('/students/:idCourse')
  async getStudentsFromCourse(@Res() res, @Param('idCourse') idCourse: string) {
    const students = await this.courseService.getAllStudentsFromCourse(
      idCourse,
    );
    return res.status(HttpStatus.OK).json(students);
  }
  @Get('/modules/:idCourse')
  async getModulesFromCourse(@Res() res, @Param('idCourse') idCourse: string) {
    const modules = await this.courseService.getAllModulesFromThisCourse(
      idCourse,
    );
    return res.status(HttpStatus.OK).json(modules);
  }

  @Get('/homeworksToCheck/:idCourse')
  async getHomeworksToCheck(@Param('idCourse') idCourse: string, @Res() res) {
    const homeworksToCheck = await this.courseService.getAllHomeworksToCheck(
      idCourse,
    );
    return res.status(HttpStatus.OK).json(homeworksToCheck);
  }
}
