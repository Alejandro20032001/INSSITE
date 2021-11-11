import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from 'src/course/course.entity';
import { CourseService } from 'src/course/course.service';
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
    } else if (user.roles[0] === 'DOCENTE') {
      const idUser = user.idUser;
      courses = await this.courseService.getAllCoursesFromTeacher(idUser);
      console.log('funciona');
    }
    return courses;
  }
}
