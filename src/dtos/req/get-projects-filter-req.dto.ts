import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { PaginatedQueryParams } from './paginated-query-params.dto';

export class GetProjectsFilterDto extends PaginatedQueryParams {
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  search: string;

  @ApiProperty({ type: Date, required: false })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @ApiProperty({ type: Date, required: false })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endDate: Date;
}
