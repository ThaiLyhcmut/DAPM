# Mail Service Module

## Tổng quan

Module này cung cấp chức năng gửi và xác thực email thông qua NestJS Mailer và quản lý mã OTP.

## Cấu hình

Cấu hình SMTP và các thông tin gửi mail được đọc từ file `.env`:

```
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_FROM=your-email@gmail.com
MAIL_FROM_NAME=Your Application
MAIL_SECURE=false
```

## Cách sử dụng

### Gửi mã OTP

```typescript
// Trong controller hoặc service khác
import { MailserverService } from '../mailserver/mailserver.service';

@Injectable()
export class AuthService {
  constructor(private readonly mailService: MailserverService) {}

  async sendVerificationCode(email: string): Promise<void> {
    await this.mailService.sendOtp({ email });
  }
}
```

### Xác thực OTP

```typescript
// Trong controller hoặc service khác
import { MailserverService } from '../mailserver/mailserver.service';

@Injectable()
export class AuthService {
  constructor(private readonly mailService: MailserverService) {}

  async verifyEmail(email: string, code: string): Promise<boolean> {
    const result = await this.mailService.verifyOtp({ email, code });
    return result.verified;
  }
}
```

### Gửi Email thông thường

```typescript
import { MailserverService } from '../mailserver/mailserver.service';

@Injectable()
export class NotificationService {
  constructor(private readonly mailService: MailserverService) {}

  async sendWelcomeEmail(user: User): Promise<void> {
    await this.mailService.sendEmail(
      user.email,
      'Chào mừng đến với ứng dụng của chúng tôi',
      `Xin chào ${user.fullName}, cảm ơn bạn đã đăng ký.`,
      `<h1>Chào mừng, ${user.fullName}!</h1><p>Cảm ơn bạn đã đăng ký tài khoản.</p>`
    );
  }
}
```

## API Endpoints

1. `POST /mail/send-otp` - Gửi mã OTP qua email
   - Body: `{ "email": "user@example.com" }`

2. `POST /mail/verify-otp` - Xác thực mã OTP
   - Body: `{ "email": "user@example.com", "code": "AbC123" }`

## Templates Email

Các template email được lưu trong thư mục `templates` và sử dụng Pug làm template engine:

- `otp-email.pug` - Template cho email gửi mã OTP

## Lưu ý

1. Khi sử dụng Gmail, bạn cần tạo "App Password" thay vì sử dụng password chính.
2. Mã OTP có hiệu lực trong 10 phút.
3. Một cron job nên được thiết lập để chạy `cleanupExpiredOtps()` định kỳ.
