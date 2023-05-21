import { Category } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryEntity implements Category {
  @ApiProperty()
  id: number;

  @ApiProperty({
    required: true,
    example: 'Animals',
    description: ' Category title',
  })
  title: string;

  @ApiProperty({
    example: 'Animals lessons',
    description: 'Describe the category purpose',
  })
  description: string;

  @ApiProperty({
    name: 'imageFile',
    example: '/file1.jpg',
    description: 'Image file',
  })
  originalName: string;
  path: string;
}
