import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeworkController } from './homework.controller';
import { HomeworkEntity } from './homework.entity';
import { HomeworkService } from './homework.service';

@Module({
  imports: [TypeOrmModule.forFeature([HomeworkEntity])],
  controllers: [HomeworkController],
  providers: [HomeworkService],
  exports: [HomeworkService],
})
export class HomeworkModule {}
