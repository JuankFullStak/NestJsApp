import { IsNotEmpty } from 'class-validator';

export class CreateProgressDto {
  @IsNotEmpty()
  score: number;

  @IsNotEmpty()
  opened: boolean;

  @IsNotEmpty()
  finished: boolean;

  @IsNotEmpty()
  questionId: number;

  @IsNotEmpty()
  userId: number;
}
