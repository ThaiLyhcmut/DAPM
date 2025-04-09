import { CustomRepository } from "src/core/repositories/custom-repository.decorator";
import { Equipment } from "../entities/equipment.entity";
import { BaseRepository } from "src/core/repositories";



@CustomRepository(Equipment)
export class EquipmentRepository extends BaseRepository<Equipment> {
  async findByAreaId(areaId: string): Promise<Equipment[] | null> {
    return this.findBy({ areaId });
  }
  async deleteByAreaId(id: string | number): Promise<void> {
    await this.delete(id);
  }
  async findByAccountId(accountId: string): Promise<Equipment[] | null> {
    return this.findBy({ accountId });
  }
}