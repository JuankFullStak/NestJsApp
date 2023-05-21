import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('progress')
@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post()
  async create(@Body() createProgressDto: CreateProgressDto) {
    return await this.progressService.create(createProgressDto);
  }

  @Get()
  async findAll() {
    return await this.progressService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.progressService.findOne(id);
  }

  @Get('byQuestion/:id')
  async findByQuestion(@Param('id', ParseIntPipe) id: number) {
    return await this.progressService.findByQuestion(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProgressDto: UpdateProgressDto,
  ) {
    return await this.progressService.update(id, updateProgressDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.progressService.remove(id);
  }
}
