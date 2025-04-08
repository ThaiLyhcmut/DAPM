import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { BaseEntity } from "../../../core/entities/base.entity";
import { Home } from "src/apis/home/entities/home.entity";

@Entity('accounts')
export class Auth extends BaseEntity {
  // column name
  @Column({ nullable: false })
  fullName: string;
  // column email
  @PrimaryColumn()
  @Column({ nullable: false, unique: true })
  email: string;

  // column password
  @Column({ nullable: false })
  password: string;
  @PrimaryColumn()

  // column phone
  @Column({ nullable: false, unique: true })
  phone: string;

  // column verified
  @Column({ default: false })
  isVerified: boolean;

  // column refresh token 
  @Column({ nullable: true })
  refreshToken?: string;

  // column address
  @Column({ nullable: true })
  address?: string;

  // column bio
  @Column({ nullable: true, type: 'text' })
  bio?: string;

  @OneToMany(() => Home, (home) => home.auth)
  homes: Home[];
}