import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export default class CreateAreaDto {
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
  @IsNotEmpty({
    message: "require my location"
  })
  location: string;
}
