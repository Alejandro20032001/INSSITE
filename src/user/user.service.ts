import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository:Repository<UserEntity>,
    ){}
    async createUser(createUserDto: CreateUserDto): Promise<UserEntity>{
        const userExist = this.userRepository.findOne({userName: createUserDto.userName});
        if(userExist) throw await new BadRequestException('Username already exist');

        const userCreated = this.userRepository.create(createUserDto);
        const newUser =  await this.userRepository.save(userCreated);

        delete newUser.password;
        return newUser;
    }
    async getOneUser(idUser: string): Promise<UserEntity> {
        const userFounded = await this.userRepository.findOne(idUser);
        delete userFounded.password;
        return userFounded;
    }
    async getAllUsers(): Promise<UserEntity[]>{
        return await this.userRepository.find({});
    }
    async getAllStudents(): Promise<UserEntity[]>{
        return await this.userRepository.find({ where: {userRoll: 'ESTUDIANTE' }});
    }
    async getAllTeachers(): Promise<UserEntity[]>{
        return await this.userRepository.find({ where:{userRoll: 'DOCENTE'}});
    }
    async findeByUserName(userName: string){
        return await this.userRepository.findOne({ userName });
    }
}
