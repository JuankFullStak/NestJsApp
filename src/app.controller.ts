import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
//import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UserResponseDto } from './users/dto/response-user-dto';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  [x: string]: any;
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.body?.username, req.body?.password);
  }

  @Post('auth/register')
  async register(@Request() req) {
    return this.authService.createUser(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req): Promise<UserResponseDto> {
    const user = await this.userService.findUserById(req.user.id);
    return new UserResponseDto(user);
  }
}
