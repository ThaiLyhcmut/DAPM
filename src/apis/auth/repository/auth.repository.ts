import { BaseRepository } from 'src/core/repositories';
import { CustomRepository } from 'src/core/repositories/custom-repository.decorator';
import { Auth } from '../entities/auth.entity';
import { FindOneOptions } from 'typeorm';

@CustomRepository(Auth)
export class AuthRepository extends BaseRepository<Auth> {

  /**
   * Tìm auth bằng email
   * @param email - Email của người dùng
   */
  async findByEmail(email: string): Promise<Auth | null> {
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
   * Xác thực tài khoản
   * @param authId - ID của auth
   */
  async verifyAuth(authId: string): Promise<void> {
    await this.update(authId, { isVerified: true });
  }

  /**
   * Cập nhật token làm mới
   * @param authId - ID của auth
   * @param refreshToken - Token làm mới
   */
  async updateRefreshToken(authId: string, refreshToken: string | undefined): Promise<void> {
    await this.update(authId, { refreshToken });
  }
}
