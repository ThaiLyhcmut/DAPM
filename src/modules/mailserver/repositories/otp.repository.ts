import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../core/repositories/base.repository';
import { Otp } from '../entities/otp.entity';
import { CustomRepository } from '../../../core/repositories/custom-repository.decorator';
import { LessThan } from 'typeorm';

@Injectable()
@CustomRepository(Otp)
export class OtpRepository extends BaseRepository<Otp> {
  /**
   * Tìm OTP hiện tại cho một email
   * @param email - Email của người dùng
   * @param code - Mã OTP
   */
  async findActiveOtp(email: string, code: string): Promise<Otp | null> {
    return this.findOneBy({
      email,
      code,
      isUsed: false,
      expiresAt: LessThan(new Date())
    });
  }

  /**
   * Đánh dấu OTP đã được sử dụng
   * @param id - ID của OTP
   */
  async markAsUsed(id: string): Promise<void> {
    await this.update(id, { isUsed: true });
  }

  /**
   * Xóa các OTP hết hạn
   */
  async cleanupExpiredOtps(): Promise<void> {
    await this.deleteMany({
      expiresAt: LessThan(new Date())
    });
  }
}
