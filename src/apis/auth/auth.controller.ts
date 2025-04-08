import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { AuthService } from "./auth.service"
import { LocalAuthGuard } from "src/core/guards/local-auth.guard"
import CreateAuthDto from "./dto/create-auth.dto"
import VerifyAuthDto from "../otp/dto/verify-otp.dto"
import { JwtAuthGuard } from "src/core/guards/jwt-auth.guard"

@ApiTags('Auth')
@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService
  ) {}

  // API register đã được di chuyển sang UserController

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() request: any) {
    console.log(request.user)
    return this.authService.login(request.user)
  }

  @Post('/register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto)
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() request: any) {
    return this.authService.profile(request.user)
  }

  @Post('/verify')
  verify(@Body() verifyOtpDto: VerifyAuthDto) {
    return this.authService.verify(verifyOtpDto)
  }
}
