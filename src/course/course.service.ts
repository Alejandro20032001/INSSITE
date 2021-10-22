import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { CourseEntity } from './couse.entity';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(CourseEntity)
        private readonly courseRepository:Repository<CourseEntity>,
    ){}
    async createCourse(createUserDto: CreateCourseDto){
        
         // Falta
    }
    async getOneCourse(idCourse: string): Promise<CourseEntity> {
        const courseFounded = await this.courseRepository.findOne(idCourse);
        delete courseFounded.idCourse;
        return courseFounded;
    }

    async getAllCourses(): Promise<CourseEntity[]>{
        return await this.courseRepository.find({});
    }

}
