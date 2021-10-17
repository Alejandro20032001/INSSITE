import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { UserEntity } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guards';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() logindto: LoginDto, @User() user: UserEntity){
        const data = await this.authService.login(user);
        return {
            massage: 'Successfull login',
            data
        };
    }
}   
