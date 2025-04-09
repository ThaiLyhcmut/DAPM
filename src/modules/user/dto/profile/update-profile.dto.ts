import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length, Matches } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({ description: 'Họ và tên người dùng', required: false })
  @IsOptional()
  @IsString()
  @Length(3, 100)
  fullName?: string;

  @ApiProperty({ description: 'Số điện thoại', required: false })
  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{10,11}$/, { message: 'Số điện thoại không hợp lệ' })
  phone?: string;

  // Thêm các trường cơ bản khác mà bạn muốn cho phép cập nhật
  // Ví dụ: địa chỉ, avatar, bio, v.v.
  
  @ApiProperty({ description: 'Địa chỉ', required: false })
  @IsOptional()
  @IsString()
  address?: string;
  
  @ApiProperty({ description: 'Bio', required: false })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  bio?: string;
}
