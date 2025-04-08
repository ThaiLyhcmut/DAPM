import { CustomRepository } from "src/core/repositories/custom-repository.decorator";
import { Home } from "../entities/home.entity";
import { BaseRepository } from "src/core/repositories";



@CustomRepository(Home)
export class HomeRepository extends BaseRepository<Home> {
  async findByAccountId(accountId: string): Promise<Home[] | null> {
    return this.findBy({ accountId });
  }
  async deleteByAccountId(id: string | number): Promise<void> {
    await this.delete(id);
  }
}
