import { Injectable, NotFoundException } from "@nestjs/common";
import { EquipmentRepository } from "./repository/equipment.repository";
import { AreaService } from "../area/area.service";
import { AuthService } from "../auth/auth.service";
import { HomeService } from "../home/home.service";


@Injectable()
export class EquipmentService {
  constructor(
    private readonly equipmentRepository: EquipmentRepository,
    private readonly areaService: AreaService,
    private readonly authService: AuthService,
    private readonly homSeService: HomeService,
  ) {}
  // Define your business logic methods here
  async getAllEquipment() {
    const equipment = await this.equipmentRepository.findAll();
    return equipment;
  }
  async getEquipment(id: string) {
    const equipment = await this.equipmentRepository.findById(id);
    return equipment;
  }
  async createEquipment(equipment: any) {
    const newEquipment = await this.equipmentRepository.create(equipment);
    return newEquipment;
  }
  updateEquipment(id: string, updateEquipmentDto: any) {
    const updatedEquipment = this.equipmentRepository.update(id, updateEquipmentDto);
    if (!updatedEquipment) {
      throw new NotFoundException('Equipment not found');
    }
    return {
      message: 'Equipment updated successfully',
    }

  }

  deleteEquipment(id: string) {
    const deletedEquipment = this.equipmentRepository.delete(id);
    if (!deletedEquipment) {
      throw new NotFoundException('Equipment not found');
    }
    return {
      message: 'Equipment deleted successfully',
    }
  }

  async findByAreaId(areaId: string) {
    const equipment = await this.equipmentRepository.findByAreaId(areaId);
    if(!equipment) {
      return false
    }
    return equipment;
  }

  async getByAccountId(accountId: string) {
    const equipment = await this.equipmentRepository.findByAccountId(accountId);
    if(!equipment) {
      return false
    }
    return equipment;
  }

  async checkAreaOfAccount(areaId: string, accountId: string): Promise<boolean> {
    const area = await this.areaService.getArea(areaId);
    if (!area) {
      return false;
    }
    return this.areaService.checkHomeOfAccount(area.homeId, accountId);
  }

  // async checkEquipmentOfArea(equipmentId: string, areaId: string): Promise<boolean> {
  //   const equipment = await this.equipmentRepository.findById(equipmentId);
  //   if (!equipment) {
  //     return false;
  //   }
  //   return equipment.areaId === areaId;
  // }
  async checkEquipmentOfAccount(equipmentId: string, accountId: string): Promise<boolean> {
    const equipment = await this.equipmentRepository.findById(equipmentId);
    if (!equipment) {
      return false;
    }
    return equipment.accountId === accountId;
  }

  async checkEquipmentOfAccountAndArea(equipmentId: string, areaId: string, accountId: string): Promise<boolean> {
    const equipment = await this.equipmentRepository.findById(equipmentId);
    if (!equipment || equipment.deleted || equipment.areaId !== areaId || equipment.accountId !== accountId) {
      return false;
    }
    const checkArea = await this.checkAreaOfAccount(areaId, accountId);
    return checkArea;
  }
}