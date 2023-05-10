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
import { ChapterService } from './chapter.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';
import { ChapterEntity } from './entities/chapter.entity';

@ApiBearerAuth()
@Controller('chapters')
@ApiTags('chapters')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Post()
  @ApiCreatedResponse({ type: ChapterEntity })
  @ApiOperation({ summary: 'Create Chapter' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiOkResponse({})
  async create(@Body() createChapterDto: CreateChapterDto) {
    return await this.chapterService.create(createChapterDto);
  }

  @Get()
  @ApiCreatedResponse({ type: ChapterEntity, isArray: true })
  @ApiOperation({ summary: 'Find All Chapters' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiOkResponse({})
  async findAll() {
    return await this.chapterService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: ChapterEntity,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.chapterService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: ChapterEntity,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateChapterDto: UpdateChapterDto,
  ) {
    return await this.chapterService.update(id, updateChapterDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: ChapterEntity,
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.chapterService.remove(id);
  }
}
