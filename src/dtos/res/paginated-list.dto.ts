import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

// This implementation is based on the following sample:
// https://github.com/typestack/class-transformer/tree/develop/sample/sample4-generics

export interface PaginatedListDtoConstructor<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): T;
}

export class PaginatedListDto<T> {
  constructor(type: PaginatedListDtoConstructor<T>) {
    this.type = type;
  }

  private type: PaginatedListDtoConstructor<T>;

  @ApiProperty({ type: Number })
  @Expose()
  public total!: number;

  @ApiProperty({ type: Number })
  @Expose()
  public page!: number;

  @ApiProperty({ type: Number })
  @Expose()
  public pageSize!: number;

  @ApiProperty({ type: Number })
  @Expose()
  public totalPages!: number;

  @Type((options) => {
    return (options?.newObject as PaginatedListDto<T>).type;
  })
  @Expose()
  public items!: T[];
}
