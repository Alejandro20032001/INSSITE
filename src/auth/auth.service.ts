import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
    ){}

    async validateUser(username:string, password :string){
       const user =  await this.userService.findeByUserName({ username }); 
       if(user && await ( compare(password, user.password) ) ){
           const { password, ...rest } = user;
        return rest;
       }
       return null;
    }

}
