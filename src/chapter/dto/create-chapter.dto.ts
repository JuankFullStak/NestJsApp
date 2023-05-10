import { IsNotEmpty } from 'class-validator';

export class CreateChapterDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  categoryId: number;

  body: string;
}
