import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetProfessionalsFilterDto {
  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsNumber()
  min_english: number;

  @IsOptional()
  @IsNumber()
  max_english: number;
}
