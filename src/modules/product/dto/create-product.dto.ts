import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'Tiêu đề sản phẩm', maxLength: 50 })
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  title: string;

  @ApiProperty({ description: 'Mô tả sản phẩm', required: false, maxLength: 255 })
  @IsOptional()
  @IsString()
  @Length(0, 255)
  description?: string;

  @ApiProperty({ description: 'Thời gian bắt đầu', required: false })
  @IsOptional()
  @IsDateString()
  timeStart?: Date;

  @ApiProperty({ description: 'Thời gian kết thúc', required: false })
  @IsOptional()
  @IsDateString()
  timeEnd?: Date;

  @ApiProperty({ description: 'Trạng thái bật/tắt', default: false })
  @IsOptional()
  @IsBoolean()
  turnOn?: boolean;

  @ApiProperty({ description: 'Chu kỳ', required: false, minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  cycle?: number;

  @ApiProperty({ 
    description: 'Trạng thái sản phẩm',
    enum: ['active', 'inactive', 'maintenance'],
    default: 'active'
  })
  @IsOptional()
  @IsEnum(['active', 'inactive', 'maintenance'])
  status?: 'active' | 'inactive' | 'maintenance';
}
