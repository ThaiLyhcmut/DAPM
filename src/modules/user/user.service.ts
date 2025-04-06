import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';
import CreateUserDto from './dto/create-dto.user';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    // userReposity la lay tu trong repositories/user
    private readonly userRepository: UserRepository
  ) {}

  /**
   * Lấy tất cả người dùng
   */
  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  /**
   * Lấy người dùng theo ID
   * @param id - ID của người dùng
   */
  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  /**
   * Lấy người dùng theo email
   * @param email - Email của người dùng
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  /**
   * Tạo người dùng mới
   * @param createUserDto - Dữ liệu để tạo người dùng
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Kiểm tra email đã tồn tại chưa
    const emailExists = await this.userRepository.isEmailExists(createUserDto.email);

    if (emailExists) {
      throw new ConflictException('Email already exists');
    }

    // Kiểm tra số điện thoại đã tồn tại chưa
    const phoneExists = await this.userRepository.isPhoneExists(createUserDto.phone);
    if (phoneExists) {
      throw new ConflictException('Phone number already exists');
    }

    // Mã hóa mật khẩu
    const hashedPassword = await hash(createUserDto.password, 10);

    // Tạo người dùng mới
    return this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  /**
   * Cập nhật thông tin người dùng
   * @param id - ID của người dùng
   * @param updateData - Dữ liệu cần cập nhật
   */
  async update(id: string, updateData: Partial<User>): Promise<void> {
    const user = await this.findById(id);
    await this.userRepository.update(id, updateData);
  }

  /**
   * Xóa người dùng
   * @param id - ID của người dùng
   */
  async delete(id: string): Promise<void> {
    const user = await this.findById(id);
    await this.userRepository.delete(id);
  }

  /**
   * Cập nhật token làm mới cho người dùng
   * @param userId - ID của người dùng
   * @param refreshToken - Token làm mới
   */
  async updateRefreshToken(userId: string, refreshToken: string | undefined): Promise<void> {
    await this.userRepository.updateRefreshToken(userId, refreshToken);
  }

  /**
   * Xác thực người dùng
   * @param userId - ID của người dùng
   */
  async verifyUser(userId: string): Promise<void> {
    await this.userRepository.verifyUser(userId);
  }
}
