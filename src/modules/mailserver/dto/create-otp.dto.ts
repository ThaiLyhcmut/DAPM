import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class CreateOtpDto {
  @IsString()
  @IsNotEmpty({
    message: "require email"
  })
  @ApiProperty({
    example: "john@example.com"
  })
  @IsEmail()
  email: string
}