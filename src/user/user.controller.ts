import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
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
  @Get('/getMissingHomeworks/:idModule')
  async getMissingHomework(
    @Res() res,
    @Param('idModule') idModule: string,
    @User() user: UserEntity,
  ) {
    const missing = await this.userService.missingHomework(idModule, user);
    return res.status(HttpStatus.OK).json(missing);
  }

  @ApiQuery({ name: 'idStudent', type: 'string', required: false })
  @Auth()
  @Get('/processOf/:idCourse')
  async getProcessOfCourse(
    @Res() res,
    @Param('idCourse') idCourse: string,
    @User() user,
    @Query() query,
  ) {
    const tareasTotales = await this.userService.getTotalToDo(idCourse);
    let tareasHechas = null;

    if (user.roles[0] === 'DOCENTE') {
      if (query.idStudent === undefined)
        res.status(HttpStatus.METHOD_NOT_ALLOWED).json({
          message: 'Missing id student',
        });
      else {
        const userAux = await this.userService.getOneUser(query.idStudent);
        tareasHechas = await this.userService.getMyHomeworks(userAux);
      }
    } else if (user.roles[0] === 'ESTUDIANTE')
      tareasHechas = await this.userService.getMyHomeworks(user);

    const tareasFaltantes = [];
    const tareasHechasDelCurso = [];
    let notaGeneral = 0;
    let notaAcumulada = 0;
    for (let i = 0; i < tareasTotales.length; i++) {
      let contiene = false;
      for (let j = 0; j < tareasHechas.length; j++) {
        if (i === tareasTotales.length - 1)
          notaAcumulada = notaAcumulada + parseInt(tareasHechas[j].score);
        if (
          tareasTotales[i][0].idResource === tareasHechas[j].resource.idResource
        ) {
          console.log('entra');
          tareasHechasDelCurso.push(tareasHechas[j]);
          contiene = true;
          break;
        }
      }
      if (!contiene) tareasFaltantes.push(tareasTotales[i]);

      notaGeneral = notaGeneral + tareasTotales[i][0].score;
    }

    res.status(HttpStatus.OK).json({
      tareasHechasDelCurso,
      tareasTotales,
      tareasFaltantes,
      notaGeneral,
      notaAcumulada,
    });
  }
}
