import { DeepPartial, FindOptionsWhere, Repository, ObjectLiteral } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

// ke thua thong qua entity duoc dinh nghia
export class BaseRepository<T extends ObjectLiteral> {
  constructor(
    // tao contractor theo entity
    private readonly repository: Repository<T>
  ) {

  }
  // Mac dinh co san trong BaseRepository tu tao

  async findOne(opsions: FindOptionsWhere<T>): Promise<T | null> {
    return this.repository.findOne(opsions);
  }
  /**
   * Tìm tất cả các bản ghi
   */
  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  /**
   * Tìm bản ghi theo các điều kiện
   * @param conditions - Điều kiện tìm kiếm
   */
  async findBy(conditions: FindOptionsWhere<T>): Promise<T[]> {
    return this.repository.findBy(conditions);
  }

  /**
   * Tìm một bản ghi theo các điều kiện
   * @param conditions - Điều kiện tìm kiếm
   */
  async findOneBy(conditions: FindOptionsWhere<T>): Promise<T | null> {
    console.log('findOneBy', conditions);
    return this.repository.findOneBy(conditions);
  }

  /**
   * Tìm một bản ghi theo ID
   * @param id - ID của bản ghi
   */
  async findById(id: string | number): Promise<T | null> {
    return this.repository.findOneBy({ id } as unknown as FindOptionsWhere<T>);
  }

  /**
   * Tạo mới một bản ghi
   * @param data - Dữ liệu của bản ghi
   */
  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity as any);
  }

  /**
   * Tạo mới nhiều bản ghi
   * @param data - Mảng dữ liệu của các bản ghi
   */
  async createMany(data: DeepPartial<T>[]): Promise<T[]> {
    const entities = this.repository.create(data);
    return this.repository.save(entities as any);
  }

  /**
   * Cập nhật một bản ghi theo ID
   * @param id - ID của bản ghi
   * @param data - Dữ liệu cần cập nhật
   */
  async update(id: string | number, data: QueryDeepPartialEntity<T>): Promise<void> {
    await this.repository.update(id, data);
  }

  /**
   * Cập nhật nhiều bản ghi theo điều kiện
   * @param conditions - Điều kiện tìm kiếm
   * @param data - Dữ liệu cần cập nhật
   */
  async updateMany(conditions: FindOptionsWhere<T>, data: QueryDeepPartialEntity<T>): Promise<void> {
    await this.repository.update(conditions, data);
  }

  /**
   * Xóa một bản ghi theo ID
   * @param id - ID của bản ghi
   */
  async delete(id: string | number): Promise<void> {
    await this.repository.delete(id);
  }

  /**
   * Xóa nhiều bản ghi theo điều kiện
   * @param conditions - Điều kiện tìm kiếm
   */
  async deleteMany(conditions: FindOptionsWhere<T>): Promise<void> {
    await this.repository.delete(conditions);
  }

  /**
   * Đếm số lượng bản ghi theo điều kiện
   * @param conditions - Điều kiện tìm kiếm
   */
  async count(conditions: FindOptionsWhere<T>): Promise<number> {
    return this.repository.countBy(conditions);
  }

  /**
   * Kiểm tra sự tồn tại của bản ghi theo điều kiện
   * @param conditions - Điều kiện tìm kiếm
   */
  async exists(conditions: FindOptionsWhere<T>): Promise<boolean> {
    const count = await this.count(conditions);
    return count > 0;
  }

  /**
   * Lấy repository gốc
   */
  getRepository(): Repository<T> {
    return this.repository;
  }
}
