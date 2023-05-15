import { IsNotEmpty } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  chapterId: number;

  @IsNotEmpty()
  body: string;
}
