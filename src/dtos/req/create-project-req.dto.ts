import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IsDateAfter } from '../validations/is-date-after';
import {
  AddAttributeToProjectReqDto,
  AddProfessionalsToProjectReqDto,
} from '.';

export class CreateProjectDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: Date })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  from: Date;

  @ApiProperty({ type: Date, required: false })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  @IsDateAfter('from', { message: '"to" date must be after "from" date' })
  to: Date;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  duration: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    type: AddProfessionalsToProjectReqDto,
    isArray: true,
    required: false,
  })
  @Type(() => AddProfessionalsToProjectReqDto)
  @IsOptional()
  @ValidateNested()
  professionals: AddProfessionalsToProjectReqDto[];

  @ApiProperty({
    type: AddAttributeToProjectReqDto,
    isArray: true,
    required: false,
  })
  @Type(() => AddAttributeToProjectReqDto)
  @IsOptional()
  @ValidateNested()
  attributes: AddAttributeToProjectReqDto[];
}
