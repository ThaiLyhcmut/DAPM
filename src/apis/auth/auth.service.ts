import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthRepository } from "./repository/auth.repository";
import { JwtService } from "@nestjs/jwt";
import CreateAuthDto from "./dto/create-auth.dto";
import * as bcrypt from 'bcryptjs';
import { Auth } from "./entities/auth.entity";
import LoginAuthDto from "./dto/login-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { OtpService } from "../otp/otp.service";
import { VerifyOtpDto } from "src/modules/mailserver/dto/verify-otp.dto";
@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly JWTRservice: JwtService,
    private readonly otpService: OtpService, 
  ){}
  // this is register
  async register(createAuthDto: CreateAuthDto) {
    // Check if email or phone number already exists
    const emailExists = await this.authRepository.isEmailExists(createAuthDto.email);
    if (emailExists) {
      throw new UnauthorizedException('Email already exists');
    }
    const phoneExists = await this.authRepository.isPhoneExists(createAuthDto.phone);
    if (phoneExists) {
      throw new UnauthorizedException('Phone number already exists');
    }
    const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);
    const auth = await this.authRepository.create({
      ...createAuthDto,
      password: hashedPassword,
    });
    const otp = await this.otpService.createOtp(createAuthDto.email);
    return auth;
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
    const auth = await this.authRepository.findOneBy({id: data.id, email: data.email});
    if (!auth) {
      throw new UnauthorizedException('User not found');
    }
    const { password, ...result } = auth;
    return result;
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
   * @param otp - Mã OTP xác thực
   */
  async verify(verifyAuthDto: VerifyOtpDto) {
    const { email, otp } = verifyAuthDto;
    const auth = await this.authRepository.findByEmail(email);
    if (!auth) {
      throw new UnauthorizedException('User not found');
    }
    // Check if OTP is valid
    const isValidOtp = await this.otpService.verifyOtp(email, otp);
    if (!isValidOtp) {
      throw new UnauthorizedException('Invalid OTP');
    }
    // Cập nhật trạng thái xác thực của tài khoản
    await this.authRepository.verifyAuth(auth.id);
    return {
      message: 'Account verified successfully',
    }
  }
}
