import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

// Day la DTO cho CreateUser
export default class CreateUserDto {
  @IsString()
  // IsString la ding nghia la string
  @IsNotEmpty({
    message: "require fullName"
  })
  // IsNotEmpty la ding nghia not empty
  @ApiProperty({ example: 'John Doe' })
  // ApiProperty la dinh nghia swagger vi du
  fullName: string

  @IsString()
  @IsNotEmpty({
    message: "require my email"
  })
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  // IsEmail la dinh nghia type email
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