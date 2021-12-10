import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursemoduleController } from './coursemodule.controller';
import { CoursemoduleService } from './coursemodule.service';
import { ResourceModule } from 'src/resource/resource.module';
import { CourseModuleEntity } from './coursemodule.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([CourseModuleEntity]), ResourceModule],
  controllers: [CoursemoduleController],
  providers: [CoursemoduleService],
  exports: [CoursemoduleService],
})
export class CoursemoduleModule {}
