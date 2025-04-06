import { Body, Controller, Get, Post, Param, Put, Delete, UseGuards, Request, Patch, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import CreateUserDto from './dto/create-dto.user';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { MailserverService } from '../mailserver/mailserver.service';
import { AuthService } from '../auth/auth.service';
import { VerifyOtpDto } from '../mailserver/dto/verify-otp.dto';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly mailserverService: MailserverService,
    private readonly authService: AuthService
  ) {}

    // Những API chỉ dành cho admin đã được loại bỏ

  @Post() 
  // method Post
  @ApiOperation({ summary: 'Create a new user and send OTP verification' }) 
  // ApiOperation mo ta endpoint
  @ApiResponse({ status: 201, description: 'User has been created successfully and OTP has been sent.' }) 
  // ApiResponse Mo ta HTTP co the xay ra 
  @ApiResponse({ status: 409, description: 'Email or phone already exists.' }) 
  // ApiResponse mo ta API co the xay
  async createUser(@Body() createUserDto: CreateUserDto): Promise<{ message: string, userId: string }> {
    // @Body => lay ra body va dinh nghia theo DTI sau dau : la gia tri tra ve
    // Create unverified user
    const user = await this.userService.create(createUserDto);
    
    // Send OTP to user's email
    await this.mailserverService.sendOtp({ email: user.email });
    
    return { 
      message: 'User registered successfully. Please verify your email with the OTP code sent to your email.', 
      userId: user.id 
    };
  }
  
  @Post('/verify')
  @ApiOperation({ summary: 'Verify user with OTP' })
  @ApiResponse({ status: 200, description: 'User has been verified successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid OTP or user not found.' })
  async verifyUser(@Body() verifyOtpDto: VerifyOtpDto): Promise<{ message: string }> {
    // Verify OTP
    const verifyResult = await this.mailserverService.verifyOtp(verifyOtpDto);
    
    if (!verifyResult.verified) {
      throw new BadRequestException('Invalid OTP');
    }
    
    // Xác thực email trong Auth entity
    await this.authService.verifyUserByEmail(verifyOtpDto.email);
    
    return { message: 'User verified successfully' };
  }

  // Các API cập nhật và xóa người dùng cũng đã được loại bỏ
  // Chỉ giữ lại register và verify
}
