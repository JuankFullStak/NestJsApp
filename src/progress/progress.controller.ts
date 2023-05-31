import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
  // @UseGuards(JwtAuthGuard)
  @Get('byCategory/:id/:userId')
  async findByCategory(@Param('id', ParseIntPipe) id: number,@Param('userId', ParseIntPipe) userId: number, @Request() req) {
    return await this.progressService.findByCategory(id, userId);
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
