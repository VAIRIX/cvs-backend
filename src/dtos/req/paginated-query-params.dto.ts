import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class PaginatedQueryParams {
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @ApiProperty({ type: Number, default: 1, minimum: 1 })
  public pageSize!: number;

  @IsInt()
  @Type(() => Number)
  @Min(0)
  @ApiProperty({ type: Number, default: 0, minimum: 0 })
  public pageNumber!: number;
}
