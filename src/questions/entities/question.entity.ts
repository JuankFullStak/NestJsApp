import { Question } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class QuestionEntity implements Question {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: true })
  chapterId: number;

  @ApiProperty({ required: false })
  body: string;

  originalName: string;
  path: string;
}
