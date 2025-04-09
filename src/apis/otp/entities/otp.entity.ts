import { BaseEntity } from "src/core/entities/base.entity";
import { Column, Entity } from "typeorm";



@Entity('otp')
export class Otp extends BaseEntity {
  @Column()
  email: string;
  @Column()
  otp: string;
}