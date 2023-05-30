import { Injectable } from '@nestjs/common';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Progress } from '@prisma/client';

@Injectable()
export class ProgressService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProgressDto: CreateProgressDto): Promise<Progress> {
    return await this.prismaService.progress.create({
      data: createProgressDto,
    });
  }

  async findAll(): Promise<Progress[]> {
    return await this.prismaService.progress.findMany();
  }

  async findOne(id: number): Promise<Progress> {
    return await this.prismaService.progress.findUnique({ where: { id } });
  }

  async findByCategory(id: number): Promise<void | Progress[]> {
    return await this.prismaService.progress.findMany({
      where: { categoryId: id },
    });
  }

  async update(
    id: number,
    updateProgressDto: UpdateProgressDto,
  ): Promise<Progress> {
    return await this.prismaService.progress.update({
      data: updateProgressDto,
      where: { id },
    });
  }

  async remove(id: number): Promise<Progress> {
    return await this.prismaService.progress.delete({ where: { id } });
  }
}
