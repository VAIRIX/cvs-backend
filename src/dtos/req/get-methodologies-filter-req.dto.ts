import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetMethodologiesFilterDto {
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  search: string;
}
