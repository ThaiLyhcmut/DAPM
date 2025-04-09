import { Injectable } from "@nestjs/common";
import { AreaRepository } from "./repository/area.repository";
import { Area } from "./entities/area-entity";
import CreateAreaDto from "./dto/create-area.dto";
import { HomeRepository } from "../home/repository/home.repository";
import { HomeService } from "../home/home.service";
import UpdateAreaDto from "./dto/update-area.dto";



@Injectable()
export class AreaService{
  constructor(
    private readonly areaRepository: AreaRepository,
    private readonly homeService: HomeService,
  ) {}

  async getArea(id: string): Promise<Area | null> {
    return this.areaRepository.findById(id);
  }

  async findByHomeId(homeId: string): Promise<Area[] | null> {
    return this.areaRepository.findByHomeId(homeId);
  }

  async checkHomeOfAccount(homeId: string, accountId: string): Promise<boolean> {
    console.log(homeId, accountId);
    const home = await this.homeService.getHomeById(homeId);
    if (!home) {
      return false;
    }
    return home.accountId === accountId;
  }

  async checkAreaOfHome(areaId: string, homeId: string): Promise<boolean> {
    const area = await this.areaRepository.findById(areaId);
    if (!area) {
      return false;
    }
    return area.homeId === homeId;
  }

  async createArea(area: any) {
    const newArea = await this.areaRepository.create(area);
    return newArea;
  }

  updateArea(id: string, updateHomeDto: any) {
    const updatedArea = this.areaRepository.update(id, updateHomeDto);
    if (!updatedArea) {
      throw new Error('Area not found');
    }
    return {
      message: 'Area updated successfully',
    }
  }

  deleteArea(id: string) {
    const deletedArea = this.areaRepository.delete(id);
    if (!deletedArea) {
      throw new Error('Area not found');
    }
    return {
      message: 'Area deleted successfully',
    }
  }

}