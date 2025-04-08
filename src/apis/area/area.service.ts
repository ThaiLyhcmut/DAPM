import { Injectable } from "@nestjs/common";
import { AreaRepository } from "./repository/area.repository";
import { Area } from "./entities/area-entity";



@Injectable()
export class AreaService{
  constructor(
    private readonly areaRepository: AreaRepository,
  ) {}

  async findByHomeId(homeId: string): Promise<Area[] | null> {
    return this.areaRepository.findByHomeId(homeId);
  }
}