import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from 'src/course/course.entity';
import { CourseService } from 'src/course/course.service';
import { CoursemoduleService } from 'src/coursemodule/coursemodule.service';
import { HomeworkEntity } from 'src/homework/homework.entity';
import { HomeworkService } from 'src/homework/homework.service';
import { ResourceEntity } from 'src/resource/resource.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';

export interface FindByUsername {
  idUser?: string;
  username?: string;
}
@Injectable()
export class UserService {
  constructor(
    private readonly courseService: CourseService,
    private readonly moduleService: CoursemoduleService,
    private readonly homeworkService: HomeworkService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    const userExist = await this.userRepository.findOne({
      username: createUserDto.username,
    });
    if (userExist)
      throw await new BadRequestException('Username already exist');

    const userCreated = this.userRepository.create(createUserDto);
    const newUser = await this.userRepository.save(userCreated);

    delete newUser.password;
    return newUser;
  }
  async getOneUser(idUser: string): Promise<UserEntity> {
    const userFounded = await this.userRepository.findOne(idUser);
    delete userFounded.password;
    return userFounded;
  }
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find({});
  }
  async getAllStudents(): Promise<UserEntity[]> {
    return await this.userRepository.find({
      where: { roles: ['ESTUDIANTE'] },
    });
  }
  async getAllTeachers(): Promise<UserEntity[]> {
    return await this.userRepository.find({ where: { roles: ['DOCENTE'] } });
  }
  async findeByUserName(data: FindByUsername) {
    const find = await this.userRepository
      .createQueryBuilder('user')
      .where(data)
      .addSelect('user.password')
      .getOne();
    if (find.username !== data.username) return null;

    return find;
  }
  async getMyCourses(user: UserEntity): Promise<CourseEntity[]> {
    let courses;
    if (user.roles[0] === 'ESTUDIANTE') {
      const idUser = user.idUser;
      courses = await this.userRepository.find({
        relations: ['courses'],
        where: { idUser },
      });
      return courses;
    } else if (user.roles[0] === 'DOCENTE') {
      const idUser = user.idUser;
      courses = await this.courseService.getAllCoursesFromTeacher(idUser);
      return courses.courses;
    }
  }
  async getMyHomeworks(user: UserEntity): Promise<HomeworkEntity[]> {
    let homework;
    if (user.roles[0] === 'ESTUDIANTE') {
      const idUser = user.idUser;
      homework = await this.userRepository.find({
        relations: ['homeworks'],
        where: { idUser },
      });
    }
    return homework[0].homeworks;
  }

  async getTotalToDo(idCourse: string): Promise<ResourceEntity[]> {
    const modules = await this.courseService.getAllModulesFromThisCourse(
      idCourse,
    );
    const cont = [];
    for (let i = 0; i < (await modules).length; i++) {
      const tareas = await this.moduleService.getHomeworksToDo(
        modules[i].idModule,
      );
      if (tareas.length !== 0) cont.push(tareas);
    }
    return cont;
  }

  async missingHomework(
    idModule: string,
    user: UserEntity,
  ): Promise<ResourceEntity[]> {
    const homeworksResource = await this.moduleService.getHomeworksToDo(
      idModule,
    );
    const homeworksResponce = await this.getMyHomeworks(user);
    const answer = [];
    const contiene = false;
    for (let i = 0; i < (await homeworksResource).length; i++) {
      let contiene = false;
      for (let j = 0; j < (await homeworksResponce).length; j++) {
        if (
          homeworksResponce[j].resource.idResource ===
          homeworksResource[i].idResource
        )
          contiene = true;
      }

      if (!contiene) answer.push(homeworksResource[i]);
    }
    //console.log(answer);
    return answer;
  }
}
