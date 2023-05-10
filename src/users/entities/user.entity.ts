import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
export class UserEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: false })
  name: string;

  @ApiProperty({ required: true })
  password: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
