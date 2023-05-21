import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  title: string;

  description: string;

  originalName: string;
  path: string;
}
