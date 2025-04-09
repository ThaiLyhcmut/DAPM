import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class ProductResponseDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  title: string;

  @Expose()
  @ApiProperty({ required: false })
  description?: string | null;

  @Expose()
  @ApiProperty({ required: false })
  timeStart?: Date | null;

  @Expose()
  @ApiProperty({ required: false })
  timeEnd?: Date | null;

  @Expose()
  @ApiProperty()
  turnOn: boolean;

  @Expose()
  @ApiProperty({ required: false })
  cycle?: number | null;

  @Expose()
  @ApiProperty({ enum: ['active', 'inactive', 'maintenance'] })
  status: 'active' | 'inactive' | 'maintenance';

  @Expose()
  @ApiProperty()
  userId: string;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<ProductResponseDto>) {
    Object.assign(this, partial);
  }
}
