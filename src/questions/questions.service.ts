import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Question } from '@prisma/client';

@Injectable()
export class QuestionsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    return await this.prismaService.question.create({
      data: createQuestionDto,
    });
  }

  async findAll(expand = false): Promise<Question[]> {
    return await this.prismaService.question.findMany({
      include: { Option: expand },
    });
  }

  async findOne(id: number): Promise<Question> {
    return await this.prismaService.question.findUnique({
      where: { id },
    });
  }

  async findByChapter(id: number): Promise<void | Question[]> {
    return await this.prismaService.question.findMany({
      where: { chapterId: id },
    });
  }

  async questionsByCategory(id: number) {
    const chapters = await this.prismaService.chapter.findMany({
      select: { id: true },
      where: { categoryId: id },
    });
    const res = chapters.map((chapter) => chapter.id);
    if (!res) return;
    return await this.prismaService.question.findMany({
      where: { chapterId: { in: res } },
    });
  }

  async update(
    id: number,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    return await this.prismaService.question.update({
      data: updateQuestionDto,
      where: { id },
    });
  }

  async remove(id: number): Promise<Question> {
    return await this.prismaService.question.delete({ where: { id } });
  }
}
