import { Injectable } from "@nestjs/common";
import { CustomRepository } from "src/core/repositories/custom-repository.decorator";
import { Product } from "../entities/product.entiti";
import { BaseRepository } from "src/core/repositories";

@Injectable()
@CustomRepository(Product)
export class ProductRepository extends BaseRepository<Product> {
  /**
   * Tìm sản phẩm theo userId
   * @param userId - ID của người dùng
   * @returns Danh sách sản phẩm của người dùng
   */
  async findByUserId(userId: string): Promise<Product[]> {
    return this.findBy({ userId });
  }

  /**
   * Kiểm tra sản phẩm có thuộc người dùng hay không
   * @param productId - ID của sản phẩm
   * @param userId - ID của người dùng
   * @returns True nếu sản phẩm thuộc người dùng, ngược lại trả về false
   */
  async isOwnedByUser(productId: string, userId: string): Promise<boolean> {
    // Sửa cách sử dụng count để tương thích với kiểu FindOptionsWhere
    const product = await this.findOneBy({
      id: productId,
      userId: userId
    } as any);
    return !!product; // Trả về true nếu tìm thấy sản phẩm, ngược lại false
  }
}