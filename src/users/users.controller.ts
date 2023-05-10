import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from './dto/response-user-dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiCreatedResponse({ type: UserEntity, isArray: true })
  async findAll(): Promise<UserResponseDto[]> {
    {
      return await this.usersService.findAll();
    }
  }

  @Get(':id')
  @ApiCreatedResponse({ type: UserEntity })
  async findById(id: number): Promise<UserResponseDto> {
    return await this.usersService.findUserById(id);
  }

  @Put(':id')
  @ApiCreatedResponse({ type: UserEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(202)
  @ApiCreatedResponse({ type: HttpCode })
  async delete(id: number): Promise<void> {
    return await this.usersService.remove(id);
  }
}
