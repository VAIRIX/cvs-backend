import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { IsDateAfter } from '../validations/is-date-after';

class BaseAddAttributeReqDto {
  @ApiProperty({ type: String })
  @IsUUID()
  attributeId: string;
}

export class AddAttributeToProjectReqDto extends BaseAddAttributeReqDto {
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
}

export class AddAttributeToProfessionalReqDto extends BaseAddAttributeReqDto {
  @ApiProperty({ type: Number })
  @IsInt()
  level: number;
}
