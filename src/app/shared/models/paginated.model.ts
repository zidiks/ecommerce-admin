export interface Paginated<T> {
  data: T;
  total: number;
  limit: number;
  page: number;
  lastPage: number;
}
