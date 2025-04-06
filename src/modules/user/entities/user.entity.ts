import { Column, Entity } from 'typeorm';
import { Role } from '../../../core/enums/role.enum';
import { BaseEntity } from '../../../core/entities/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true, default: undefined })
  refreshToken?: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER
  })
  role: Role;
  
  @Column({ nullable: true })
  address?: string;
  
  @Column({ nullable: true, type: 'text' })
  bio?: string;
  
  // Thêm các trường cơ bản khác nếu cần
}
