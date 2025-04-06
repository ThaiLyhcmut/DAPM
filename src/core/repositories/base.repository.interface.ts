import { DeepPartial, FindOptionsWhere, ObjectLiteral } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface IBaseRepository<T extends ObjectLiteral> {
  findAll(): Promise<T[]>;
  findBy(conditions: FindOptionsWhere<T>): Promise<T[]>;
  findOneBy(conditions: FindOptionsWhere<T>): Promise<T | null>;
  findById(id: string | number): Promise<T | null>;
  create(data: DeepPartial<T>): Promise<T>;
  createMany(data: DeepPartial<T>[]): Promise<T[]>;
  update(id: string | number, data: QueryDeepPartialEntity<T>): Promise<void>;
  updateMany(conditions: FindOptionsWhere<T>, data: QueryDeepPartialEntity<T>): Promise<void>;
  delete(id: string | number): Promise<void>;
  deleteMany(conditions: FindOptionsWhere<T>): Promise<void>;
  count(conditions: FindOptionsWhere<T>): Promise<number>;
  exists(conditions: FindOptionsWhere<T>): Promise<boolean>;
}
