import { IsNotEmpty } from 'class-validator';

export class CreateOptionDto {
  @IsNotEmpty()
  questionId: number;

  @IsNotEmpty()
  body: string;

  @IsNotEmpty()
  correct: boolean;
}
