import { Area } from "src/apis/area/entities/area-entity";
import { Auth } from "src/apis/auth/entities/auth.entity";
import { BaseEntity } from "src/core/entities/base.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";


@Entity('homes')
export class Home extends BaseEntity {
  // column name
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  accountId: string;

  @ManyToOne(() => Auth, (auth) =>  auth.homes)
  @JoinColumn({ name: 'accountId'})
  auth: Auth;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  location: string;

  @Column({ default : false })
  deleted: boolean;

  @OneToMany(() => Area, (area) => area.home)
  areas: Area[];
}