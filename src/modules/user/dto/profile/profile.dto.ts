import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Role } from '../../../../core/enums/role.enum';

@Exclude()
export class ProfileDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  fullName: string;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  phone: string;

  @Expose()
  @ApiProperty()
  isVerified: boolean;

  @Expose()
  @ApiProperty({ enum: Role, enumName: 'Role' })
  role: Role;

  @Expose()
  @ApiProperty({ required: false })
  address?: string;

  @Expose()
  @ApiProperty({ required: false })
  bio?: string;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<ProfileDto>) {
    Object.assign(this, partial);
  }
}
