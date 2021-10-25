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
import { Auth, User } from 'src/common';
import { UserEntity } from 'src/user/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}
  @Auth()
  @Post('')
  async createCourse(
    @Res() res,
    @Body() body: CreateCourseDto,
    @User() userOwn: UserEntity,
  ) {
    const courseCreated = await this.courseService.createCourse(body, userOwn);
    return res.status(HttpStatus.OK).json({
      massage: 'created',
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
  @Auth()
  @Put('/:idCourse')
  async enrollCourse(
    @Res() res,
    @Param('idCourse') idCourse: string,
    @User() user,
  ) {
    const newCourse = await this.courseService.enrollCourse(user, idCourse);
    return res.status(HttpStatus.OK).json(newCourse);
  }
  @Auth()
  @Get('/students/:idCourse')
  async getStudentsFromCourse(@Res() res, @Param('idCourse') idCourse: string) {
    const students = await this.courseService.getAllStudentsFromCourse(
      idCourse,
    );
    return res.status(HttpStatus.OK).json(students);
  }
}
