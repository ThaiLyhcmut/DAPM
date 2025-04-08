// import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
// import { MailerService } from '@nestjs-modules/mailer';
// import { CreateOtpDto } from './dto/create-otp.dto';
// import { VerifyOtpDto } from './dto/verify-otp.dto';
// import { OtpRepository } from './repositories/otp.repository';

// @Injectable()
// export class MailserverService {
//   constructor(
//     private readonly mailerService: MailerService,
//     private readonly otpRepository: OtpRepository,
//   ) {}

//   /**
//    * Tạo và gửi mã OTP qua email
//    * @param createOtpDto - Dữ liệu tạo OTP (email)
//    */
//   async sendOtp(createOtpDto: CreateOtpDto): Promise<{ message: string }> {
//     const { email } = createOtpDto;
    
//     // Tạo mã OTP ngẫu nhiên
//     const code = this.generateRandomCode(6);
    
//     // Tính thời gian hết hạn (10 phút sau khi tạo)
//     const expiresAt = new Date();
//     expiresAt.setMinutes(expiresAt.getMinutes() + 10);
    
//     try {
//       // Lưu OTP vào cơ sở dữ liệu
//       await this.otpRepository.create({
//         email,
//         code,
//         expiresAt,
//         isUsed: false,
//       });
      
//       // Gửi email với mã OTP
//       await this.mailerService.sendMail({
//         to: email,
//         subject: 'Verification Code',
//         html: `
//           <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//             <h2>Mã xác thực của bạn</h2>
//             <p>Xin chào,</p>
//             <p>Đây là mã xác thực của bạn. Mã này sẽ hết hạn sau 10 phút.</p>
//             <p style="font-size: 24px; font-weight: bold; padding: 10px; background-color: #f5f5f5; border-radius: 5px;">${code}</p>
//             <p>Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email này.</p>
//             <p>Trân trọng,<br>Đội ngũ hỗ trợ</p>
//           </div>
//         `,
//       });
      
//       return { message: 'OTP đã được gửi đến email của bạn' };
//     } catch (error) {
//       console.error('Lỗi khi gửi OTP:', error);
//       throw new InternalServerErrorException('Không thể gửi mã xác thực. Vui lòng thử lại sau.');
//     }
//   }

//   /**
//    * Xác thực mã OTP
//    * @param verifyOtpDto - Dữ liệu xác thực OTP (email, code)
//    */
//   async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<{ message: string; verified: boolean }> {
//     const { email, otp } = verifyOtpDto;
    
//     // Tìm OTP hiện tại cho email và code cụ thể
//     const otp = await this.otpRepository.findOneBy({
//       email,
//       code,
//       isUsed: false,
//     });
    
//     if (!otp) {
//       throw new BadRequestException('Mã OTP không hợp lệ hoặc đã hết hạn');
//     }
    
//     const now = new Date();
//     if (now > otp.expiresAt) {
//       throw new BadRequestException('Mã OTP đã hết hạn');
//     }
    
//     // Đánh dấu OTP đã được sử dụng
//     await this.otpRepository.update(otp.id, { isUsed: true });
    
//     return { message: 'Xác thực thành công', verified: true };
//   }

//   /**
//    * Gửi email thông thường 
//    * @param to - Địa chỉ email người nhận
//    * @param subject - Tiêu đề email
//    * @param text - Nội dung text
//    * @param html - Nội dung HTML (tùy chọn)
//    */
//   async sendEmail(to: string, subject: string, text: string, html?: string): Promise<void> {
//     try {
//       await this.mailerService.sendMail({
//         to,
//         subject,
//         text,
//         html: html || text,
//       });
//     } catch (error) {
//       console.error('Lỗi khi gửi email:', error);
//       throw new InternalServerErrorException('Không thể gửi email. Vui lòng thử lại sau.');
//     }
//   }

//   /**
//    * Tạo mã ngẫu nhiên với độ dài cụ thể
//    * @param length - Độ dài của mã
//    * @private
//    */
//   private generateRandomCode(length: number): string {
//     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let result = '';
//     for (let i = 0; i < length; i++) {
//       result += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     return result;
//   }

//   /**
//    * Xóa các OTP hết hạn (có thể chạy theo lịch)
//    */
//   async cleanupExpiredOtps(): Promise<void> {
//     try {
//       await this.otpRepository.cleanupExpiredOtps();
//     } catch (error) {
//       console.error('Lỗi khi dọn dẹp OTP hết hạn:', error);
//     }
//   }
// }
