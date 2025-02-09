import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.prismaService.category.create({
      data: createCategoryDto,
    });
  }

  async findAll(userId: number): Promise<Category[]> {
    return await this.prismaService.category.findMany({
      include: {
        Progress: {
          select: {
            score: true,
          },
          where: {
            userId,
          },
          take: 1,
        },
      },
    });
  }

  async findOne(id: number): Promise<Category> {
    const result = await this.prismaService.category.findUnique({
      where: { id },
    });
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return await this.prismaService.category.update({
      data: updateCategoryDto,
      where: { id },
    });
  }

  async remove(id: number): Promise<Category> {
    return await this.prismaService.category.delete({ where: { id } });
  }
}
