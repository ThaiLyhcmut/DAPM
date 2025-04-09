import { Area } from "src/apis/area/entities/area-entity";
import { Auth } from "src/apis/auth/entities/auth.entity";
import { BaseEntity } from "src/core/entities/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Timestamp } from "typeorm";



@Entity('equipments')
export class Equipment extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: false })
  areaId: string;

  @Column({ nullable: false })
  accountId: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  brand: string;

  @Column({ nullable: true })
  model: string;

  @Column({ nullable: false })
  serialNumber: string;

  @Column({ nullable: true })
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @Column({ default: false })
  status: boolean;

  @Column({ default: false })
  deleted: boolean;

  @ManyToOne(() => Auth, (auth) => auth.equipments)
  @JoinColumn({ name: 'accountId'})
  auth: Auth;

  @ManyToOne(() => Area, (area) => area.equipments)
  @JoinColumn({ name: 'areaId'})
  area: Area;
}