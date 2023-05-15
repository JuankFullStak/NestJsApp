import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  StreamableFile,
  Res,
} from '@nestjs/common';
import { ResourceService } from './resource.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { ResourceEntity } from './entities/resource.entity';
import { ApiCreatedResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileType } from '@prisma/client';
import { join } from 'path';
import { createReadStream } from 'fs';
import { Response } from 'express';

@ApiTags('resource')
@ApiBearerAuth()
@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Post()
  @ApiCreatedResponse({ type: ResourceEntity })
  create(@Body() createResourceDto: CreateResourceDto) {
    return this.resourceService.create(createResourceDto);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('file')
  uploadFile(
    @Body() body: CreateResourceDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          //new MaxFileSizeValidator({ maxSize: 1000 }),
          //new FileTypeValidator({ fileType: 'image/jpg' }),
          //new FileTypeValidator({ fileType: 'video/mp4' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const { chapterId } = body;
    const raw = file.mimetype.split('/')[0];
    const type =
      raw === 'video'
        ? FileType.VIDEO
        : raw === 'image'
        ? FileType.IMAGE
        : FileType.AUDIO;
    const originalName = file.originalname;
    const fileName = file.filename;
    const path = file.path;

    return this.resourceService.create({
      chapterId,
      type,
      originalName,
      fileName,
      path,
    });
    // return {
    //   body,
    //   file: file.buffer.toString(),
    // };
  }

  @Get(':id')
  async downloadFile(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) response: Response,
  ) {
    const resource = await this.resourceService.findOne(id);
    if (!resource) return;

    const filePath = join(
      '/Users/familia/Developer/Everom/ChildGameApp/ingle-backend/',
      resource.path,
    );
    const formatt = resource.originalName.split('.').pop();
    response.contentType(resource.type.toLowerCase().concat('/' + formatt));
    const file = createReadStream(filePath);
    return new StreamableFile(file);
  }

  @Get()
  @ApiCreatedResponse({ type: ResourceEntity, isArray: true })
  findAll() {
    return this.resourceService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: ResourceEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.resourceService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateResourceDto: UpdateResourceDto,
  ) {
    return this.resourceService.update(id, updateResourceDto);
  }

  @Delete(':id')
  @HttpCode(202)
  @ApiCreatedResponse({ type: HttpCode })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.resourceService.remove(+id);
  }
}