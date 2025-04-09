import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";



export default class UpdateHomeDto {
  @IsString()
  @ApiProperty({ example: 'Home', required: false })
  @IsOptional()
  name?: string | null;

  @ApiProperty({ example: 'Địa chỉ của home', required: false })
  @IsOptional()
  @IsString()
  location?: string | null;

  @ApiProperty({ example: 'Mô tả của home', required: false })
  @IsString()
  @IsOptional()
  description?: string | null;
}