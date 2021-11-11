import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User, Auth } from 'src/common/index';
import { UserEntity } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guards';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() logindto: LoginDto, @User() user: UserEntity) {
    const data = await this.authService.login(user);
    return {
      massage: 'Successfull login',
      data,
    };
  }
  @Auth()
  @Get('profile')
  profile(@User() user: UserEntity) {
    return {
      message: 'Your profile',
      user,
    };
  }

  @Auth()
  @Get('refresh')
  refreshToken(@User() user: UserEntity) {
    const data = this.authService.login(user);
    return {
      massage: 'Refresh ok',
      data,
    };
  }
}
