import { Controller, Post, Request, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { AuthService } from "./auth.service"
import { LocalAuthGuard } from "src/core/guards/local-auth.guard"

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
}
