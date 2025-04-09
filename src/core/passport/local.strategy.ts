import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "src/apis/auth/auth.service";
import LoginAuthDto from "src/modules/auth/dto/login-auth.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor (
    private readonly authService: AuthService
  ) { super({
    usernameField: 'email',  // Dùng 'email' làm trường 'username'
    passwordField: 'password',  // Dùng 'password' làm trường mật khẩu
  }); }
  async validate(email: string, password: string) {
    const loginAuthDto: LoginAuthDto = {
      email: email,
      password: password
    }
    const auth = await this.authService.validateAuth(loginAuthDto)
    if (!auth) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return auth
  }
}