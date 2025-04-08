import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";



export default class CreateHomeDto {
  @IsString()
  @IsNotEmpty({
    message: "require my name"
  })
  @ApiProperty({ example: 'Home' })
  name: string;

  @IsString()
  @IsNotEmpty({
    message: "require my location"
  })
  @ApiProperty({ example: '123 Main St' })
  location: string;
  @IsString()
  @IsNotEmpty({
    message: "require my description"
  })
  @ApiProperty({ example: 'This is a beautiful home' })
  description: string;


}