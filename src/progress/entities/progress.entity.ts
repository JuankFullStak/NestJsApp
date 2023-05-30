import { Progress } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ProgressEntity implements Progress {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: true })
  categoryId: number;

  @ApiProperty({ required: true })
  userId: number;

  @ApiProperty({ required: true })
  score: number;

  @ApiProperty()
  correct: number;

  @ApiProperty()
  incorrect: number;
}
