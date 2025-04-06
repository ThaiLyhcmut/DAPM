import { IsEmail } from "class-validator";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity('otps')
export class Otp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @PrimaryColumn()
  @IsEmail()
  email: string

  @Column()
  code: string

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  expiredAt: Date;

}