export type PaginatedResult<T> = {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  items: T[];
};
