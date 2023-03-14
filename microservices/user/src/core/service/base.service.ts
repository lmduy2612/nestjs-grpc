import { BaseEntity, DeleteResult, In, Repository } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';

import { Pagination } from '../pagination/pagination';
import { IBaseService } from './base.sevice.interface';

export class BaseService<T extends BaseEntity, R extends Repository<T>>
  implements IBaseService<T>
{
  protected readonly repository: R;

  constructor(repository: R) {
    this.repository = repository;
  }

  async findPaginate(
    filters: any,
    perPage: number | null,
    page: number | null,
    sort: any,
  ) {
    const order = sort ? JSON.parse(sort) : { id: 'DESC' };
    const where = filters ? JSON.parse(filters) : {};
    const take = perPage || 30;
    const currentPage = page || 1;
    const skip = (currentPage - 1) * take;
    const [results, total] = await this.repository.findAndCount({
      where,
      order,
      take,
      skip,
    });

    return new Pagination<T>({
      results,
      total,
      page: currentPage,
      limit: take,
    });
  }

  findAll(): Promise<T[]> {
    return this.repository.find();
  }

  findById(id: number): Promise<T> {
    return this.repository.findOneById(id);
  }

  findByIds(ids: [number]): Promise<T[]> {
    return this.repository.findByIds(ids);
  }

  create(data: any): Promise<T> {
    return this.repository.save(data);
  }

  async update(id: number, data: any): Promise<T> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
