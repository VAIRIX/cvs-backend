import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetProfessionalsFilterDto {
  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsNumber()
  minEnglish: number;

  @IsOptional()
  @IsNumber()
  maxEnglish: number;
}
