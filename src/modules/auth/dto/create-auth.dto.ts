import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty({
    message: "require fullName"
  })
  @ApiProperty({ example: 'John Doe' })
  fullName: string

  @IsString()
  @IsNotEmpty({
    message: "require my email"
  })
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty({
    message: "require my password"
  })
  @ApiProperty({ example: '123456' })
  password: string

  @IsString()
  @IsNotEmpty({
    message: "require my phone"
  })
  @ApiProperty({ example: '0123456789' })
  phone: string
}
