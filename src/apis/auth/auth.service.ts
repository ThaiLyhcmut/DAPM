import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthRepository } from "./repository/auth.repository";
import { JwtService } from "@nestjs/jwt";
import { CreateAuthDto } from "./dto/create-auth.dto";
import * as bcrypt from 'bcryptjs';
import { Auth } from "./entities/auth.entity";
import LoginAuthDto from "./dto/login-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly JWTRservice: JwtService 
  ){}
  async create(createAuthDto: CreateAuthDto) {
    const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);
    return this.authRepository.create({
      ...createAuthDto,
      password: hashedPassword
    });
  }

  login(auth: Auth) {
    return this.generateToke(auth);
  }

  async generateToke(auth: Auth) {
    const payload = { email: auth.email, sub: auth.id }
    return {
      access_tokken: this.JWTRservice.sign(payload),
    }
  }

  async validateAuth(loginAuthDto: LoginAuthDto) {
    const auth = await this.authRepository.findByEmail(loginAuthDto.email);
    if (!auth) {
      return null;
    }
    console.log(auth)
    // Check if user is verified
    if (!auth.isVerified) {
      throw new ForbiddenException('Account not verified. Please verify your email first.');
    }
    console.log(auth)
    const status = await bcrypt.compare(loginAuthDto.password, auth.password);
    if (status) {
      return auth;
    }
    return null;
  }

  async profile(data: any) {
    return await this.authRepository.findOneBy({id: data.id, email: data.email});
  }
  async update(data: any, updateAuthDto: UpdateAuthDto) {
    const auth = await this.profile(data);
    if (!auth) {
      throw new UnauthorizedException('User not found');
    }
    await this.authRepository.update(auth.id, updateAuthDto);
    return this.profile(data);
  }

  async remove(id: string) {
    await this.authRepository.delete(id);
    return { message: `User with id ${id} has been removed` };
  }

  /**
   * Xác thực tài khoản
   * @param email - Email của tài khoản cần xác thực
   */
  async verifyUserByEmail(email: string): Promise<void> {
    const auth = await this.authRepository.findByEmail(email);
    if (!auth) {
      throw new UnauthorizedException('User not found');
    }
    await this.authRepository.update(auth.id, { isVerified: true });
  }
}
