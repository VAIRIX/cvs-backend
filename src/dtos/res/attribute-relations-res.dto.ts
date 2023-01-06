import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { AttributeResDto } from '.';

export class BaseAttributeRelationResDto {
  @ApiProperty({ type: AttributeResDto })
  @Type(() => AttributeResDto)
  @Expose()
  attribute: AttributeResDto;
}

export class ProfessionalAttributeResDto extends BaseAttributeRelationResDto {
  @ApiProperty({ type: Number })
  @Expose()
  level: number;
}

export class ProjectAttributeResDto extends BaseAttributeRelationResDto {
  @ApiProperty({ type: Date })
  @Expose()
  from: Date;

  @ApiProperty({ type: Date })
  @Expose()
  to: Date;
}
