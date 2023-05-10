import { Exclude, Expose } from 'class-transformer';
import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UserResponseDto extends PartialType(CreateUserDto) {
  @Exclude()
  password: string;

  id: number;
  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;

  @Expose({ name: 'createdAt' })
  transformCreatedAt() {
    return this.created_at;
  }

  @Expose({ name: 'updatedAt' })
  transformUpdatedAt() {
    return this.updated_at;
  }

  constructor(partial: Partial<UserResponseDto>) {
    super();
    Object.assign(this, partial);
  }
}
