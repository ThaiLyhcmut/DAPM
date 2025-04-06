import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { BaseEntity } from "src/core/entities/base.entity";

@Entity('products')
export class Product extends BaseEntity {
  @Column({ length: 50 })
  title: string; // Cột title với kiểu varchar(50)

  @Column({ type: 'text', nullable: true  })
  description: string | null; // Cột description có thể NULL

  @Column({ type: 'datetime', nullable: true })
  timeStart: Date | null; // Cột timeStart với kiểu datetime có thể NULL

  @Column({ type: 'datetime', nullable: true })
  timeEnd: Date | null; // Cột timeEnd với kiểu datetime có thể NULL

  @Column({ type: 'tinyint', default: 0 })
  turnOn: boolean; // Cột turnOn với kiểu tinyint(1), giá trị mặc định là 0

  @Column({ type: 'int', nullable: true })
  cycle: number | null; // Cột cycle có thể NULL

  @Column({ type: 'enum', enum: ['active', 'inactive', 'maintenance'], default: 'active' })
  status: 'active' | 'inactive' | 'maintenance'; // Cột status với enum và giá trị mặc định là 'active'

  @Column({ name: 'user_id' })
  userId: string; // Foreign key tham chiếu đến user.id

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User; // Quan hệ nhiều-một với User
}
