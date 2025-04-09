import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class createEquipmentDto {
  @IsString()
  @ApiProperty({ example: 'Living Room' })
  @IsNotEmpty({
    message: "require my name"
  })
  name: string;

  @IsString()
  @ApiProperty({ example: 'This is a spacious living room' })
  @IsNotEmpty({
    message: "require my description"
  })
  description: string;
  
  @IsString()
  @ApiProperty({ example: '123 Main St' })
  @IsOptional()
  location: string | null;

  @IsString()
  @ApiProperty({ example: 'Light' })
  @IsOptional()
  type: string | null;

  @IsString()
  @ApiProperty({ example: 'Philips' })
  @IsOptional()
  brand: string | null;

  @IsString()
  @ApiProperty({ example: 'Hue' })
  @IsOptional()
  model: string | null;

  @IsString()
  @ApiProperty({ example: '123456789' })
  @IsNotEmpty({
    message: "require my serial number"
  })
  serialNumber: string;

  @Type(() => Date)
  @IsDate()
  @ApiProperty({ example: '2023-10-01' })
  @IsOptional()
  startDate: Date | null;

  @Type(() => Date)
  @IsDate()
  @ApiProperty({ example: '2024-10-01' })
  @IsOptional()
  endDate: Date | null;

}