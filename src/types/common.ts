export interface ISortParams {
  [key: string]: 'asc' | 'desc';
}

export interface IPaginatorParams {
  pageNumber: number;
  pageSize: number;
  sortParams: ISortParams;
}

export interface IPaginator<T> {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: T[];
}

export type IdType = string;
