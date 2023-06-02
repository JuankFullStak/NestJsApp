import { IsNotEmpty } from 'class-validator';
export class CreateProgressDto {
  @IsNotEmpty()
  correct: number;

  @IsNotEmpty()
  incorrect: number;

  @IsNotEmpty()
  score: number;

  @IsNotEmpty()
  categoryId: number;

  @IsNotEmpty()
  userId: number;
}
