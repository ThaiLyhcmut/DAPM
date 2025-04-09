import { CustomRepository } from "src/core/repositories/custom-repository.decorator";
import { Area } from "../entities/area-entity";
import { BaseRepository } from "src/core/repositories";


@CustomRepository(Area)
export class AreaRepository extends BaseRepository<Area> {
  async findByHomeId(homeId: string): Promise<Area[] | null> {
    return this.findBy({ homeId });
  }
  async deleteByHomeId(id: string | number): Promise<void> {
    await this.delete(id);
  }
}