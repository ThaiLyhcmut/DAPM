import { Controller, Get, Body, Put, UseGuards, Param, NotFoundException, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { UserService } from '../user.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { JwtAuthGuard } from '../../../core/guards/jwt-auth.guard';
import { CurrentUser } from '../../../core/decorators/current-user.decorator';
import { UpdateProfileDto } from '../dto/profile/update-profile.dto';
import { ProfileDto } from '../dto/profile/profile.dto';

@ApiTags('profile')
@Controller('profile')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class ProfileController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Return the current user profile.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async getProfile(@CurrentUser() user: any): Promise<ProfileDto> {
    const profile = await this.userService.findById(user.id);
    return new ProfileDto(profile);
  }
  
  @Get(':id')
  @ApiOperation({ summary: 'Get another user\'s public profile' })
  @ApiResponse({ status: 200, description: 'Return the public profile of the specified user.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getPublicProfile(@Param('id') id: string): Promise<ProfileDto> {
    try {
      const user = await this.userService.findById(id);
      
      // Tạo DTO với các trường công khai
      return new ProfileDto({
        id: user.id,
        fullName: user.fullName,
        // Lưu ý: email, bio và các trường khác sẽ được loại trừ vì chúng không được gán
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException('User not found');
    }
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiResponse({ status: 200, description: 'Profile has been updated successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async updateProfile(
    @CurrentUser() user: any,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<{ message: string }> {
    // Không cần phải xóa các trường nhạy cảm vì DTO đã kiểm soát
    // chỉ có các trường được định nghĩa trong DTO mới được cập nhật
    await this.userService.update(user.id, updateProfileDto);
    return { message: 'Profile updated successfully' };
  }
}
