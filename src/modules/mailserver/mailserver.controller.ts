// import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
// import { MailserverService } from './mailserver.service';
// import { CreateOtpDto } from './dto/create-otp.dto';
// import { VerifyOtpDto } from './dto/verify-otp.dto';
// import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

// @ApiTags('mail')
// @Controller('mail')
// export class MailserverController {
//   constructor(private readonly mailserverService: MailserverService) {}

//   @Post('send-otp')
//   @ApiOperation({ summary: 'Gửi mã OTP qua email' })
//   @ApiResponse({ status: 200, description: 'OTP đã được gửi thành công' })
//   @ApiResponse({ status: 500, description: 'Lỗi server khi gửi OTP' })
//   @HttpCode(HttpStatus.OK)
//   async sendOtp(@Body() createOtpDto: CreateOtpDto) {
//     return this.mailserverService.sendOtp(createOtpDto);
//   }

//   @Post('verify-otp')
//   @ApiOperation({ summary: 'Xác thực mã OTP' })
//   @ApiResponse({ status: 200, description: 'OTP đã được xác thực thành công' })
//   @ApiResponse({ status: 400, description: 'OTP không hợp lệ hoặc đã hết hạn' })
//   @HttpCode(HttpStatus.OK)
//   async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
//     return this.mailserverService.verifyOtp(verifyOtpDto);
//   }
// }
