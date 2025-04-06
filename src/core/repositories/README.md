# Base Repository Documentation

## Tổng quan

`BaseRepository` cung cấp một lớp cơ sở để thực hiện các thao tác CRUD (Create, Read, Update, Delete) cơ bản với cơ sở dữ liệu sử dụng TypeORM trong NestJS.

## Cài đặt và cấu hình

1. Tạo một entity kế thừa từ `BaseEntity` (nếu muốn sử dụng entity cơ sở)
2. Tạo một repository kế thừa từ `BaseRepository<YourEntity>`
3. Đăng ký repository trong module của bạn

## Ví dụ sử dụng

### Tạo một entity

```typescript
// user.entity.ts
import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
```

### Tạo một repository

```typescript
// user.repository.ts
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../common/repositories/base.repository';
import { User } from './user.entity';
import { CustomRepository } from '../common/repositories/custom-repository.decorator';

@Injectable()
@CustomRepository(User)
export class UserRepository extends BaseRepository<User> {
  // Bạn có thể thêm các phương thức tùy chỉnh ở đây
  async findByEmail(email: string): Promise<User | null> {
    return this.findOneBy({ email });
  }
}
```

### Đăng ký repository trong module

```typescript
// user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../common/repositories/typeorm-ex.module';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([UserRepository]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
```

### Sử dụng trong service

```typescript
// user.service.ts
import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async create(userData: Partial<User>): Promise<User> {
    return this.userRepository.create(userData);
  }

  async update(id: string, userData: Partial<User>): Promise<void> {
    await this.userRepository.update(id, userData);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
```

## API Reference

### Các phương thức chính

- `findAll()`: Lấy tất cả bản ghi
- `findBy(conditions)`: Lấy các bản ghi theo điều kiện
- `findOneBy(conditions)`: Lấy một bản ghi theo điều kiện
- `findById(id)`: Lấy một bản ghi theo ID
- `create(data)`: Tạo một bản ghi mới
- `createMany(data)`: Tạo nhiều bản ghi mới
- `update(id, data)`: Cập nhật một bản ghi theo ID
- `updateMany(conditions, data)`: Cập nhật nhiều bản ghi theo điều kiện
- `delete(id)`: Xóa một bản ghi theo ID
- `deleteMany(conditions)`: Xóa nhiều bản ghi theo điều kiện
- `count(conditions)`: Đếm số bản ghi theo điều kiện
- `exists(conditions)`: Kiểm tra sự tồn tại của bản ghi theo điều kiện
- `getRepository()`: Lấy repository gốc của TypeORM
