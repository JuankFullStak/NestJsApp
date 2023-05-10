import { Injectable } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Resource } from '@prisma/client';

@Injectable()
export class ResourceService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createResourceDto: CreateResourceDto): Promise<Resource> {
    return await this.prismaService.resource.create({
      data: createResourceDto,
    });
  }

  async findAll(): Promise<Resource[]> {
    return await this.prismaService.resource.findMany();
  }

  async findOne(id: number): Promise<Resource> {
    return await this.prismaService.resource.findUnique({ where: { id } });
  }

  async update(
    id: number,
    updateResourceDto: UpdateResourceDto,
  ): Promise<Resource> {
    return await this.prismaService.resource.update({
      data: updateResourceDto,
      where: { id },
    });
  }

  async remove(id: number): Promise<void> {
    await this.prismaService.resource.delete({ where: { id } });
    return;
  }
}
