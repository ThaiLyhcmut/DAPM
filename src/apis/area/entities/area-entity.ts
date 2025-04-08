import { ApiProperty } from "@nestjs/swagger";
import { Home } from "src/apis/home/entities/home.entity";
import { BaseEntity } from "src/core/entities/base.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";


@Entity('areas')
export class Area extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  location: string;

  @Column({ nullable: false })
  homeId: string;

  @ManyToOne(() => Home, (home) => home.areas)
  @JoinColumn({ name: 'homeId'})
  home: Home;

}