import { CustomRepository } from "src/core/repositories/custom-repository.decorator";
import { Otp } from "../entities/otp.entity";
import { BaseRepository } from "src/core/repositories";



@CustomRepository(Otp)
export class OtpRepository extends BaseRepository<Otp> {
  async findByEmail(email: string): Promise<Otp | null> {
    return this.findOneBy({ email });
  }
  async deleteByEmail(id: string | number): Promise<void> {
    await this.delete(id);
  }
}