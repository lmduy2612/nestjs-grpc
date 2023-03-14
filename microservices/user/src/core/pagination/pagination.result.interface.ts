export interface PaginationResultInterface<PaginationEntity> {
  results: PaginationEntity[];
  total: number;
  page: number;
  limit: number;
  itemCount?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}
