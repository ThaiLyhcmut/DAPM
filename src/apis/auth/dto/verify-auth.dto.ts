import { IsNotEmpty, IsString } from "class-validator";



export default class VerifyAuthDto {
  @IsString()
  // IsString la ding nghia la string
  @IsNotEmpty({
    message: "require my email"
  })
  // IsNotEmpty la ding nghia not empty
  email: string;

  @IsString()
  @IsNotEmpty({
    message: "require my password"
  })
  password: string;

  @IsString()
  @IsNotEmpty({
    message: "require my otp"
  })
  otp: string;
}