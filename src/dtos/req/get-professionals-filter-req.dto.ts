import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { PaginatedQueryParams } from './paginated-query-params.dto';

export class GetProfessionalsFilterDto extends PaginatedQueryParams {
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  search: string;

  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  @IsInt()
  minEnglish: number;

  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  @IsInt()
  maxEnglish: number;
}
