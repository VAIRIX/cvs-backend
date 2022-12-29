import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class GetProfessionalsFilterDto {
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
