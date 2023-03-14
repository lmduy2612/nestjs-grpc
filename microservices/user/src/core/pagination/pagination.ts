import { PaginationResultInterface } from './pagination.result.interface';

interface IMetaPagination {
  total: number;
  page: number;
  pageCount: number;
  itemCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export class Pagination<PaginationEntity> {
  public results: PaginationEntity[];
  public meta: IMetaPagination;

  constructor(paginationResults: PaginationResultInterface<PaginationEntity>) {
    const itemCount = paginationResults.results.length;
    const page = paginationResults.page;

    this.results = paginationResults.results;
    this.meta = {
      total: paginationResults.total,
      page: paginationResults.page,
      itemCount: paginationResults.results.length,
      pageCount: Math.ceil(itemCount / paginationResults.limit),
      hasPreviousPage: page > 1,
      hasNextPage: page < itemCount,
    };
  }
}
