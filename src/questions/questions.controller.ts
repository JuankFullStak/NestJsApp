import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  Res,
  StreamableFile,
  Query,
  ParseBoolPipe,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { QuestionEntity } from './entities/question.entity';
import { join } from 'path';
import { createReadStream, unlinkSync } from 'fs';
import { Response } from 'express';
import { expand } from 'rxjs';

@ApiBearerAuth()
@ApiTags('questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    return await this.questionsService.create(createQuestionDto);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('file')
  uploadFile(
    @Body() body: CreateQuestionDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [],
      }),
    )
    file: Express.Multer.File,
  ) {
    body.originalName = file.originalname;
    body.path = file.path;
    return this.questionsService.create(body);
  }

  @Get()
  async findAll(@Query('expand', ParseBoolPipe) expand?: boolean) {
    const parameter = expand ? true : false;
    return await this.questionsService.findAll(parameter);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.questionsService.findOne(id);
  }

  @Get('byChapter/:id')
  async findByChapter(@Param('id', ParseIntPipe) id: number) {
    return await this.questionsService.findByChapter(id);
  }

  @Get('questionsByCategory/:id')
  async questionsByCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.questionsService.questionsByCategory(id);
  }

  @Get('file/:id')
  @ApiCreatedResponse({ type: QuestionEntity })
  @ApiOperation({ summary: 'get Category imageFile by id' })
  @ApiNotFoundResponse({ status: 404, description: 'Not Found' })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden' })
  async downloadFile(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) response: Response,
  ) {
    const category = await this.questionsService.findOne(id);
    if (!category) return;
    const filePath = join(__dirname, '../..', category.path);
    const formatt = category.originalName.split('.').pop();
    response.contentType('audio/' + formatt);
    const file = createReadStream(filePath);
    return new StreamableFile(file);
  }
  @UseInterceptors(FileInterceptor('file'))
  @Patch('file/:id')
  async updateAll(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [],
      }),
    )
    file: Express.Multer.File,
  ) {
    const { chapterId, body } = updateQuestionDto;
    const originalName = file.originalname;
    const path = file.path;
    return await this.questionsService.update(id, {
      chapterId,
      body,
      originalName,
      path,
    });
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return await this.questionsService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const question = await this.questionsService.findOne(id);
      if (!question) return;
      const filePath = join(__dirname, '../..', question.path);
      unlinkSync(filePath);
      return await this.questionsService.remove(id);
    } catch (error) {
      console.log(error);
    }
  }
}
