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
  StreamableFile,
  Res,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiHeader,
} from '@nestjs/swagger';
import { join } from 'path';
import { createReadStream } from 'fs';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { CategoryEntity } from './entities/category.entity';

@ApiBearerAuth()
@Controller('categories')
@ApiTags('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiCreatedResponse({ type: CategoryEntity })
  @ApiBody({ type: CategoryEntity })
  @ApiOperation({ summary: 'Create category' })
  @ApiNotFoundResponse({ status: 404, description: 'Not Found' })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden' })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoriesService.create(createCategoryDto);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('file')
  @ApiCreatedResponse({ type: CategoryEntity })
  @ApiOperation({ summary: 'Create category and upload imageFile' })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden' })
  uploadFile(
    @Body() body: CreateCategoryDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [],
      }),
    )
    file: Express.Multer.File,
  ) {
    const { title, description } = body;
    const originalName = file.originalname;
    const path = file.path;
    console.log(file);

    return this.categoriesService.create({
      title,
      description,
      originalName,
      path,
    });
  }

  @Get('file/:id')
  @ApiCreatedResponse({ type: CategoryEntity })
  @ApiOperation({ summary: 'get Category imageFile by id' })
  @ApiNotFoundResponse({ status: 404, description: 'Not Found' })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden' })
  async downloadFile(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) response: Response,
  ) {
    const category = await this.categoriesService.findOne(id);
    if (!category) return;
    const filePath = join(__dirname, '../..', category.path);
    const formatt = category.originalName.split('.').pop();
    response.contentType('image/' + formatt);
    const file = createReadStream(filePath);
    return new StreamableFile(file);
  }

  @Get()
  @ApiCreatedResponse({ type: CategoryEntity, isArray: true })
  async findAll() {
    return await this.categoriesService.findAll();
  }

  // @Get()
  // @ApiCreatedResponse({ type: CategoryResponseDto, isArray: true })
  // async findAllWithImage(
  //   @Res({ passthrough: true }) response: Response,
  // ): Promise<CategoryResponseDto[]> {
  //   const categories = await this.categoriesService.findAll();
  //   if (!categories) return;
  //   const cat = categories.map((category) => {
  //     const filePath = join(__dirname, '../..', category.path);
  //     const formatt = category.originalName.split('.').pop();
  //     response.contentType('image/' + formatt);
  //     const file = createReadStream(filePath);
  //     category[image] = new StreamableFile(file);
  //   });
  // }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: CategoryEntity,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: CategoryEntity,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: CategoryEntity,
  })
  @ApiCreatedResponse({ type: CategoryEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.categoriesService.remove(id);
  }
}
