import { EntityId } from 'typeorm/repository/EntityId';
import { DeleteResult } from 'typeorm';

export interface IBaseService<T> {
  find(): Promise<T[]>;

  findById(id: EntityId): Promise<T>;

  findByIds(id: [EntityId]): Promise<T[]>;

  create(data: any): Promise<T>;

  update(id: EntityId, data: any): Promise<T>;

  delete(id: EntityId): Promise<DeleteResult>;
}
