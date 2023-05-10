import { Chapter } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ChapterEntity implements Chapter {
  @ApiProperty()
  id: number;

  @ApiProperty({
    required: true,
  })
  name: string;

  @ApiProperty()
  body: string;

  @ApiProperty({ required: true })
  categoryId: number;
}
