import { Injectable } from '@nestjs/common';
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
        const userCreated = this.userRepository.create(createUserDto);
        return await this.userRepository.save(userCreated);
    }
    async getOneUser(idUser: string): Promise<UserEntity> {
        return await this.userRepository.findOne(idUser);
    }
    async getAllUsers(): Promise<UserEntity[]>{
        return await this.userRepository.find({});
    }
    async getAllStudents(): Promise<UserEntity[]>{
        return await this.userRepository.find({ where: {userRole: 'ESTUDIANTE' }});
    }
    async getAllTeachers(): Promise<UserEntity[]>{
        return await this.userRepository.find({ where:{userRole: 'DOCENTE'}});
    }
}
