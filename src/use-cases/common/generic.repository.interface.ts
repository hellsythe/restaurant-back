export interface IGenericRepository<T> {
  find(query: any): Promise<T[]>;
  findOne(query: any): Promise<T>;
  create(item: any): Promise<T>;
  update(query: any, item: any): Promise<T>;
  delete(query: any): Promise<T>;
}
