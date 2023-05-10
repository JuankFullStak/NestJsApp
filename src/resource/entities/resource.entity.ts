import { Resource, FileType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ResourceEntity implements Resource {
  originalName: string;
  fileName: string;
  @ApiProperty()
  id: number;
  @ApiProperty({ required: true })
  chapterId: number;
  @ApiProperty()
  path: string;
  @ApiProperty({ required: true })
  type: FileType;
}
