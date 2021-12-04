import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursemoduleController } from './coursemodule.controller';
import { CoursemoduleService } from './coursemodule.service';
import { CourseModuleEntity } from './coursemodule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseModuleEntity])],
  controllers: [CoursemoduleController],
  providers: [CoursemoduleService],
  exports: [CoursemoduleService],
})
export class CoursemoduleModule {}
