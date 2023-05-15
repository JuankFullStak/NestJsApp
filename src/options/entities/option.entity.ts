import { Option } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class OptionEntity implements Option {
  @ApiProperty()
  id: number;
  @ApiProperty({ required: true })
  questionId: number;

  @ApiProperty({ required: true })
  body: string;

  @ApiProperty({ required: true })
  correct: boolean;
}
