import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";



@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  createdAt: Timestamp;

  @Column()
  updatedAt: Timestamp;
}