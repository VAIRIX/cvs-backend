import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetProfessionalsFilterDto {
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  search: string;

  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  @IsNumber()
  minEnglish: number;

  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  @IsNumber()
  maxEnglish: number;
}
