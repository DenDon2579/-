export interface ISortParams {
  [key: string]: 'asc' | 'desc';
}

export interface IPaginator<T> {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: T[];
}
