import { IsNotEmpty } from 'class-validator';
import { FileType } from '@prisma/client';

export class CreateResourceDto {
  type: FileType;

  path: string;
  originalName: string;
  fileName: string;

  @IsNotEmpty()
  chapterId: number;
}
