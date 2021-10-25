import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { CourseController } from './course.controller';
import { CourseEntity } from './course.entity';
import { CourseService } from './course.service';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity])],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
