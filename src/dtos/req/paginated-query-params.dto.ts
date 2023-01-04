import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { DTO_DEFAULTS } from 'src/constants';

export class PaginatedQueryParams {
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @ApiProperty({
    type: Number,
    default: DTO_DEFAULTS.DEFAULT_PAGE_SIZE,
    minimum: 1,
  })
  @IsOptional()
  public pageSize!: number;

  @IsInt()
  @Type(() => Number)
  @Min(0)
  @ApiProperty({
    type: Number,
    default: DTO_DEFAULTS.DEFAULT_PAGE_NUMBER,
    minimum: 0,
  })
  @IsOptional()
  public pageNumber!: number;

  // Needed in order to have default DTO values
  constructor(
    pageSize = DTO_DEFAULTS.DEFAULT_PAGE_SIZE,
    pageNumber = DTO_DEFAULTS.DEFAULT_PAGE_NUMBER,
  ) {
    this.pageSize = pageSize;
    this.pageNumber = pageNumber;
  }
}
