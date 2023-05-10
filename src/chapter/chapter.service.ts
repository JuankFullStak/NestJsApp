import { Injectable } from '@nestjs/common';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Chapter } from '@prisma/client';

@Injectable()
export class ChapterService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createChapterDto: CreateChapterDto): Promise<Chapter> {
    return await this.prismaService.chapter.create({ data: createChapterDto });
  }

  async findAll(): Promise<Chapter[]> {
    return await this.prismaService.chapter.findMany();
  }

  async findOne(id: number): Promise<Chapter> {
    return await this.prismaService.chapter.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    updateChapterDto: UpdateChapterDto,
  ): Promise<Chapter> {
    return await this.prismaService.chapter.update({
      data: updateChapterDto,
      where: { id },
    });
  }

  async remove(id: number): Promise<Chapter> {
    return await this.prismaService.chapter.delete({ where: { id } });
  }
}
