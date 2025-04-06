import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export default class LoginAuthDto {
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
}