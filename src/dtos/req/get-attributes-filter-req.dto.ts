import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetAttributesFilterDto {
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  search: string;
}
