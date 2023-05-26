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
} from '@nestjs/common';
import { OptionsService } from './options.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
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
import { OptionEntity } from './entities/option.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { createReadStream } from 'fs';
import { Response } from 'express';

@ApiBearerAuth()
@ApiTags('options')
@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Post()
  async create(@Body() createOptionDto: CreateOptionDto) {
    return await this.optionsService.create(createOptionDto);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('file')
  uploadFile(
    @Body() body: CreateOptionDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [],
      }),
    )
    file: Express.Multer.File,
  ) {
    body.originalName = file.originalname;
    body.path = file.path;
    console.log(file);

    return this.optionsService.create(body);
  }

  @Get()
  async findAll() {
    return await this.optionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.optionsService.findOne(id);
  }

  @Get('byQuestion/:id')
  async findByQuestion(@Param('id', ParseIntPipe) id: number) {
    return await this.optionsService.findByQuestion(id);
  }

  @Get('file/:id')
  @ApiCreatedResponse({ type: OptionEntity })
  @ApiOperation({ summary: 'get Option imageFile by id' })
  @ApiNotFoundResponse({ status: 404, description: 'Not Found' })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden' })
  async downloadFile(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) response: Response,
  ) {
    const category = await this.optionsService.findOne(id);
    if (!category) return;
    const filePath = join(__dirname, '../..', category.path);
    const formatt = category.originalName.split('.').pop();
    response.contentType('image/' + formatt);
    const file = createReadStream(filePath);
    return new StreamableFile(file);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOptionDto: UpdateOptionDto,
  ) {
    return await this.optionsService.update(id, updateOptionDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.optionsService.remove(id);
  }
}
