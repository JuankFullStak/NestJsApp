import { Progress } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ProgressEntity implements Progress {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: true })
  questionId: number;

  @ApiProperty({ required: true })
  userId: number;

  @ApiProperty({ required: true })
  score: number;

  @ApiProperty({ required: true })
  opened: boolean;

  @ApiProperty({ required: true })
  finished: boolean;
}
