import { Module } from '@nestjs/common';
import { CoursemoduleController } from './coursemodule.controller';
import { CoursemoduleService } from './coursemodule.service';

@Module({
  controllers: [CoursemoduleController],
  providers: [CoursemoduleService]
})
export class CoursemoduleModule {}
