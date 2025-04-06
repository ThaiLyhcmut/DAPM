import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../core/entities/base.entity';

@Entity('otps')
export class Otp extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  code: string;

  @Column({ type: 'timestamp' })
  expiresAt: Date;

  @Column({ default: false })
  isUsed: boolean;
}
