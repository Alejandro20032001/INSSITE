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
import { ApiTags } from '@nestjs/swagger';
import { Auth, User } from 'src/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  async createUser(@Res() res, @Body() body: CreateUserDto) {
    const userCreated = await this.userService.createUser(body);
    return res.status(HttpStatus.OK).json({
      message: 'created',
      userCreated,
    });
  }

  @Get('/students')
  async getAllStudent(@Res() res) {
    const studentsFounded = await this.userService.getAllStudents();
    return res.status(HttpStatus.OK).json(studentsFounded);
  }

  @Get('/teachers')
  async getAllTeachers(@Res() res) {
    const teachersFounded = await this.userService.getAllTeachers();
    return res.status(HttpStatus.OK).json(teachersFounded);
  }
  @Auth()
  @Get('/homeworks')
  async getMyhomeworks(@Res() res, @User() user: UserEntity) {
    const homeworks = await this.userService.getMyHomeworks(user);
    return res.status(HttpStatus.OK).json(homeworks);
  }

  @Auth()
  @Get('/courses')
  async getMyCourses(@Res() res, @User() user: UserEntity) {
    const coursesFounded = await this.userService.getMyCourses(user);
    return res.status(HttpStatus.OK).json(coursesFounded);
  }

  @Get('/:idUser')
  async getOneUser(@Res() res, @Param('idUser') idUser: string) {
    const userFounded = await this.userService.getOneUser(idUser);
    if (!userFounded) throw new NotFoundException('Not exist');
    return res.status(HttpStatus.OK).json(userFounded);
  }

  @Get('')
  async getAllUsers(@Res() res) {
    const usersFounded = await this.userService.getAllUsers();
    return res.status(HttpStatus.OK).json(usersFounded);
  }

  @Auth()
  @Get('/processOf/:idCourse')
  async getProcessOfCourse(
    @Res() res,
    @Param('idCourse') idCourse: string,
    @User() user,
  ) {
    const tareasHechas = (await this.userService.getMyHomeworks(user)).length;
    const tareasTotales = await this.userService.getTotalToDo(idCourse);
    //console.log(tareasTotales);
    res.status(HttpStatus.OK).json({
      hechas: tareasHechas,
      totales: tareasTotales,
    });
  }
}
