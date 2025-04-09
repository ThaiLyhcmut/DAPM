import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export default class UpdateAreaDto {

  @IsString()
  @ApiProperty({ example: 'Living Room' })
  @IsOptional()
  name?: string | null;

  @IsString()
  @ApiProperty({ example: 'This is a spacious living room' })
  @IsOptional()
  description?: string | null;
  @IsString()
  @ApiProperty({ example: '123 Main St' })
  @IsOptional()
  location?: string | null;
}
