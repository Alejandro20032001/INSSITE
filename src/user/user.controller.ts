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
import { ApiBody, ApiCreatedResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
    constructor(private userService: UserService){}
    @Post()
    async createUser(@Res() res, @Body() body:CreateUserDto){
        const userCreated = await this.userService.createUser(body);
        return res.status(HttpStatus.OK).json({
            massage:'created',
            userCreated,
        });
    }

    @Get('/students')
    async getAllStudent(@Res() res){
        const studentsFounded = await this.userService.getAllStudents();
        return res.status(HttpStatus.OK).json(studentsFounded)
    }

    @Get('/teachers')
    async getAllTeachers(@Res() res){
        const teachersFounded = await this.userService.getAllTeachers();
        console.log(teachersFounded);
        return res.status(HttpStatus.OK).json(teachersFounded);
    }

    @Get('/:idUser')
    async getUser(@Res() res, @Param('idUser') idUser: string) {
        const userFounded = await this.userService.getOneUser(idUser);
        if (!userFounded) throw new NotFoundException('Not exist');
        return res.status(HttpStatus.OK).json(userFounded);
    }

    @Get('')
    async getAllUsers(@Res() res){
        const usersFounded = await this.userService.getAllUsers();
        return res.status(HttpStatus.OK).json(usersFounded)
    }
}
