import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseController } from './course.controller';
import { CourseEntity } from './course.entity';
import { CourseService } from './course.service';
import { CoursemoduleModule } from '../coursemodule/coursemodule.module';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity]), CoursemoduleModule],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
