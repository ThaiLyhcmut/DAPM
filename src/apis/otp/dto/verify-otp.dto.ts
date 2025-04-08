import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";



export default class VerifyAuthDto {
  @IsString()
  // IsString la ding nghia la string
  @IsNotEmpty({
    message: "require my email"
  })
  @ApiProperty({
    example: "john@example.com"
  })
  // IsNotEmpty la ding nghia not empty
  email: string;

  @IsString()
  @IsNotEmpty({
    message: "require my password"
  })
  @ApiProperty({
    example: "123456"
  })
  password: string;

  @IsString()
  @IsNotEmpty({
    message: "require my otp"
  })
  @ApiProperty({
    example: "xhcnuw"
  })
  otp: string;
}