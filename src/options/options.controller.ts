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
} from '@nestjs/swagger';
import { OptionEntity } from './entities/option.entity';

@ApiBearerAuth()
@ApiTags('options')
@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Post()
  async create(@Body() createOptionDto: CreateOptionDto) {
    return await this.optionsService.create(createOptionDto);
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
