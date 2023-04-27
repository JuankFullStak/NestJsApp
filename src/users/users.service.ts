import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password } = createUserDto;
    return await this.prismaService.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async findUserById(id: number): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      // optional, you can return null/undefined depending on your use case
      throw new NotFoundException();
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      // optional, you can return null/undefined depending on your use case
      throw new NotFoundException();
    }

    return user;
  }

  // async findOne(id: number) {
  //   return await this.prismaService.user.findFirst();
  // }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.prismaService.user.update({
      data: updateUserDto,
      where: { id },
    });
  }

  async remove(id: number): Promise<User> {
    return await this.prismaService.user.delete({
      where: { id },
    });
  }
}
