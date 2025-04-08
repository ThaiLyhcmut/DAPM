import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Otp } from "./entities/otp.entity";
import { Repository } from "typeorm";
import { OtpRepository } from "./repository/otp.repository";



@Injectable()
export class OtpService {
  constructor(

    private readonly otpRepository: OtpRepository
    // private mailService: MailService,
  ) {
    console.log("OtpService")
  }

  async verifyOtp(email: string, otp: string): Promise<boolean> {
    const otpRecord = await this.otpRepository.findByEmail(email);
    if (!otpRecord) {
      return false;
    }
    await this.otpRepository.delete(otpRecord.id);
    return true;
  }
  private generateRandomCode(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  async createOtp(email: string) {
    const otp = this.generateRandomCode(6);    
    await this.otpRepository.create(
      { email, otp }
    );
    // await this.mailService.sendOtp(email, otp);
  }

  
}