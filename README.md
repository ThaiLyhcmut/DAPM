# Hệ thống Xác thực và Quản lý Profile

## Tính năng

- Đăng ký tài khoản với xác thực email (OTP)
- Đăng nhập với xác thực JWT
- Quản lý profile
  - Xem và chỉnh sửa profile cá nhân
  - Xem profile người khác (chỉ những trường được phép)

## API Endpoints

### Đăng ký và xác thực

#### Đăng ký tài khoản mới
```
POST /users
```
- Request Body:
```json
{
  "fullName": "Tên người dùng",
  "email": "user@example.com",
  "password": "mật khẩu",
  "phone": "1234567890"
}
```
- Response: Tài khoản được tạo và OTP gửi đến email
- Lưu ý: Tài khoản chỉ được đánh dấu là đã xác thực sau khi xác minh OTP

#### Xác thực email bằng OTP
```
POST /users/verify
```
- Request Body:
```json
{
  "email": "user@example.com",
  "code": "123456"
}
```
- Response: Tài khoản được xác thực

#### Gửi lại OTP (nếu cần)
```
POST /mail/send-otp
```
- Request Body:
```json
{
  "email": "user@example.com"
}
```
- Response: OTP mới được gửi đến email

### Đăng nhập và Profile

#### Đăng nhập
```
POST /auth/login
```
- Request Body:
```json
{
  "email": "user@example.com",
  "password": "mật khẩu"
}
```
- Response: JWT access token
- Lưu ý: Chỉ tài khoản đã xác thực mới có thể đăng nhập

#### Xem profile cá nhân
```
GET /profile
```
- Header: `Authorization: Bearer YOUR_JWT_TOKEN`
- Response: Thông tin đầy đủ về profile

#### Cập nhật profile cá nhân
```
PUT /profile
```
- Header: `Authorization: Bearer YOUR_JWT_TOKEN`
- Request Body (các trường cần cập nhật):
```json
{
  "fullName": "Tên mới",
  "phone": "9876543210"
}
```
- Response: Profile được cập nhật

#### Xem profile người khác
```
GET /profile/:id
```
- Response: Chỉ các trường công khai (id, fullName, createdAt, updatedAt)
- Lưu ý: Endpoint này không yêu cầu xác thực

## Quy trình xác thực

1. Người dùng đăng ký với email, mật khẩu và thông tin profile
2. Hệ thống tạo tài khoản (đánh dấu là chưa xác thực) và gửi OTP đến email
3. Người dùng xác thực email bằng cách gửi OTP
4. Sau khi xác thực, người dùng có thể đăng nhập và nhận JWT token
5. JWT token được sử dụng cho tất cả các yêu cầu cần xác thực

## Bảo mật Profile

- Profile cá nhân: Bạn có thể xem và chỉnh sửa tất cả chi tiết
- Profile người khác: Bạn chỉ có thể xem các trường công khai (id, fullName, v.v.)

## Xử lý lỗi

- 400: Bad Request (dữ liệu đầu vào không hợp lệ)
- 401: Unauthorized (không có token hợp lệ)
- 404: Not Found (người dùng hoặc tài nguyên không tồn tại)
- 409: Conflict (email hoặc số điện thoại đã tồn tại)
