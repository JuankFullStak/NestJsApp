import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { SignupInput } from './dto/signup.input';
import { Token } from './models/token.model';
import { PasswordService } from './password.service';
import { ConfigService } from '@nestjs/config';
import { SecurityConfig } from 'src/common/configs/config.interface';
import { UserResponseDto } from 'src/users/dto/response-user-dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return await this.passwordService.hashPassword(password);
  }

  async createUser(payload: SignupInput): Promise<Token> {
    const hashedPassword = await this.passwordService.hashPassword(
      payload.password,
    );

    try {
      const user = await this.usersService.create({
        ...payload,
        password: hashedPassword,
      });

      return this.generateTokens({
        userId: user.id,
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(`Email ${payload.email} already used.`);
      }
      throw new Error(e);
    }
  }

  async validateUser(userId: number): Promise<UserResponseDto> {
    return await this.usersService.findUserById(userId);
  }

  async login(email: string, password: string): Promise<Token> {
    const user = await this.usersService.findUserByEmail(email);
    const passwordValid = await this.passwordService.validatePassword(
      password,
      user.password,
    );
    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }
    return this.generateTokens({
      userId: user.id,
    });
  }

  getUserFromToken(token: string): Promise<UserResponseDto> {
    const id = this.jwtService.decode(token)['userId'];
    return this.usersService.findUserById(id);
  }

  generateTokens(payload: { userId: number }): Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private generateAccessToken(payload: { userId: number }): string {
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(payload: { userId: number }): string {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: securityConfig.refreshIn,
    });
  }

  refreshToken(token: string) {
    try {
      const { userId } = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      return this.generateTokens({
        userId,
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
