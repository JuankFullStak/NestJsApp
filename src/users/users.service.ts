import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { ChangePasswordInput } from './dto/change-password.input';
import { PasswordService } from 'src/auth/password.service';
import { UserResponseDto } from './dto/response-user-dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly passwordService: PasswordService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const { name, email, password } = createUserDto;
    const user = await this.prismaService.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    return new UserResponseDto(user);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.prismaService.user.findMany();
    return users.map((user) => new UserResponseDto(user));
  }

  async findUserById(id: number): Promise<UserResponseDto> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      // optional, you can return null/undefined depending on your use case
      throw new NotFoundException();
    }
    return new UserResponseDto(user);
  }

  async findUserByEmail(email: string): Promise<UserResponseDto | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      // optional, you can return null/undefined depending on your use case
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    return new UserResponseDto(user);
  }

  async changePassword(
    userId: number,
    userPassword: string,
    changePassword: ChangePasswordInput,
  ): Promise<UserResponseDto> {
    const passwordValid = await this.passwordService.validatePassword(
      changePassword.oldPassword,
      userPassword,
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    const hashedPassword = await this.passwordService.hashPassword(
      changePassword.newPassword,
    );

    const user = await this.prismaService.user.update({
      data: {
        password: hashedPassword,
      },
      where: { id: userId },
    });
    return new UserResponseDto(user);
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.prismaService.user.update({
      data: updateUserDto,
      where: { id },
    });

    return new UserResponseDto(user);
  }

  async remove(id: number): Promise<void> {
    await this.prismaService.user.delete({
      where: { id },
    });
    return;
  }
}
