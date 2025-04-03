import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) { }
  @Get() // /user
  index() {
    return [this.userService.getUser(), this.authService.login()]
  }
}
