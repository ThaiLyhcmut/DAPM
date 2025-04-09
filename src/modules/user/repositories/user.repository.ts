import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../core/repositories/base.repository';
import { User } from '../entities/user.entity';
import { CustomRepository } from '../../../core/repositories/custom-repository.decorator';

@Injectable()
@CustomRepository(User)
// CustomReposity dung de costom lai entity theo User
export class UserRepository extends BaseRepository<User> {
  // tao them cac BaseRepository khac de co the su dung voi muc dich khac

  /**
   * Tìm người dùng theo email
   * @param email - Email của người dùng
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.findOneBy({ email });
  }

  /**
   * Kiểm tra email đã tồn tại chưa
   * @param email - Email cần kiểm tra
   */
  async isEmailExists(email: string): Promise<boolean> {
    return this.exists({ email });
  }

  /**
   * Kiểm tra số điện thoại đã tồn tại chưa
   * @param phone - Số điện thoại cần kiểm tra
   */
  async isPhoneExists(phone: string): Promise<boolean> {
    return this.exists({ phone });
  }

  /**
   * Cập nhật token làm mới cho người dùng
   * @param userId - ID của người dùng
   * @param refreshToken - Token làm mới
   */
  async updateRefreshToken(userId: string, refreshToken: string | undefined): Promise<void> {
    await this.update(userId, { refreshToken });
  }

  /**
   * Xác thực người dùng
   * @param userId - ID của người dùng
   */
  async verifyUser(userId: string): Promise<void> {
    await this.update(userId, { isVerified: true });
  }
}
