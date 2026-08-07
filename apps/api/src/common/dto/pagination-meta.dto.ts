export class PaginationMetaDto {
  readonly pageNumber: number;
  readonly pageSize: number;
  readonly totalCount: number;
  readonly totalPages: number;
  readonly hasPreviousPage: boolean;
  readonly hasNextPage: boolean;

  constructor(page: number, limit: number, totalCount: number) {
    this.pageNumber = Number(page);
    this.pageSize = Number(limit);
    this.totalCount = totalCount;

    this.totalPages =
      totalCount > 0 ? Math.ceil(totalCount / this.pageSize) : 0;

    this.hasPreviousPage = this.pageNumber > 1 && this.totalPages > 0;
    this.hasNextPage = this.pageNumber < this.totalPages;
  }
}
