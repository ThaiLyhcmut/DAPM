import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";


export class UpdateEquipmentDto {
  @ApiProperty({ example: 'Living Room' })
  @IsOptional()
  name?: string | null;

  @ApiProperty({ example: 'This is a spacious living room' })
  @IsOptional()
  description?: string | null;

  @ApiProperty({ example: '123 Main St' })
  @IsOptional()
  location?: string | null;

  @ApiProperty({ example: 'Light' })
  @IsOptional()
  type?: string | null;

  @ApiProperty({ example: 'Philips' })
  @IsOptional()
  brand?: string | null;

  @ApiProperty({ example: 'Hue' })
  @IsOptional()
  model?: string | null;

  @ApiProperty({ example: '123456789' })
  @IsOptional()
  serialNumber?: string | null;

  @ApiProperty({ example: '2023-10-01' })
  @IsOptional()
  startDate?: Date | null;

  @ApiProperty({ example: '2024-10-01' })
  @IsOptional()
  endDate?: Date | null;

  @ApiProperty({ example: 'true' })
  @IsOptional()
  status: boolean | null;
}