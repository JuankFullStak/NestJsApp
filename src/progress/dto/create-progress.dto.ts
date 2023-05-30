import { IsNotEmpty } from 'class-validator';

export class CreateProgressDto {
  correct: number;

  incorrect: number;

  @IsNotEmpty()
  score: number;

  @IsNotEmpty()
  categoryId: number;

  @IsNotEmpty()
  userId: number;
}
