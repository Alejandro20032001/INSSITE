import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { HomeworkService } from './homework.service';
import { UserEntity } from 'src/user/user.entity';
import { Auth, User } from 'src/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('homework')
@ApiTags('Homework')
export class HomeworkController {
  constructor(private homeworkService: HomeworkService) {}

  @Auth()
  @Post('')
  async createHomework(
    @Res() res,
    @Body() body: CreateHomeworkDto,
    @User() userOwn: UserEntity,
  ) {
    const homeworkCreated = await this.homeworkService.createHomework(
      body,
      userOwn,
    );
    return res.status(HttpStatus.OK).json({
      message: 'created',
      homeworkCreated,
    });
  }

  @Get('')
  async getAllHomeworks(@Res() res) {
    const homeworksFounded = await this.homeworkService.getAllHomeworks();
    return res.status(HttpStatus.OK).json(homeworksFounded);
  }

  @Auth()
  @Put('/:idHomework/:score') //falta ruta
  async setHomeworkScore(
    @Res() res,
    @Param('idHomework') idResource: string,
    @Param('score') score: number,
  ) {
    const rev = await this.homeworkService.setHomeworkScore(idResource, score);
    if (rev.affected === 0) return res.status(HttpStatus.NOT_FOUND).json(rev);
    else return res.status(HttpStatus.OK).json(rev);
  }
}
