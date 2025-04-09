import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { BaseEntity } from "../../../core/entities/base.entity";

@Entity('accounts')
export class Auth extends BaseEntity {
  // id đã được kế thừa từ BaseEntity

  @Column()
  fullName: string;
  @PrimaryColumn()
  @Column()
  email: string;

  @Column()
  password: string;
  @PrimaryColumn()
  @Column()
  phone: string;

  // createdAt và updatedAt đã được kế thừa từ BaseEntity

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  refreshToken?: string;
}