import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAuthDto } from './create-auth.dto';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateAuthDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'John Doe', required: false })
  fullName?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ example: 'john@example.com', required: false })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '0123456789', required: false })
  phone?: string;
}
