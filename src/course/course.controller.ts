import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Res } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateCourseDto } from './dto/create-course.dto';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
    constructor(private courseService: CourseService){}
    @Post()
    async createCourse(){
        //falta
    }

    

    @Get('/:idCourse')
    async getUser(@Res() res, @Param('idCourse') idCourse: string) {
        const courseFounded = await this.courseService.getOneCourse(idCourse);
        if (!courseFounded) throw new NotFoundException('Not exist');
        return res.status(HttpStatus.OK).json(courseFounded);
    }

    @Get('')
    async getAllCourses(@Res() res){
        const coursesFounded = await this.courseService.getAllCourses();
        return res.status(HttpStatus.OK).json(coursesFounded)
    }

}
