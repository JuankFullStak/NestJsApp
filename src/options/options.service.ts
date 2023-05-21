import { Injectable } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Option } from '@prisma/client';

@Injectable()
export class OptionsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createOptionDto: CreateOptionDto): Promise<Option> {
    return await this.prismaService.option.create({ data: createOptionDto });
  }

  async findAll(): Promise<Option[]> {
    return await this.prismaService.option.findMany();
  }

  async findOne(id: number): Promise<Option> {
    return await this.prismaService.option.findUnique({
      where: { id },
    });
  }

  async findByQuestion(id: number): Promise<void | Option[]> {
    return await this.prismaService.option.findMany({
      where: { questionId: id },
    });
  }

  async update(id: number, updateOptionDto: UpdateOptionDto): Promise<Option> {
    return await this.prismaService.option.update({
      data: updateOptionDto,
      where: { id },
    });
  }

  async remove(id: number): Promise<Option> {
    return await this.prismaService.option.delete({ where: { id } });
  }
}
