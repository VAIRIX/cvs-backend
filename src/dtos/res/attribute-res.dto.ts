import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { AttributeTypeResDto } from './attribute-type-res.dto';
import { BaseResDto } from './base-res.dto';

export class AttributeResDto extends BaseResDto {
  @ApiProperty({ type: String })
  @Expose()
  name: string;

  @ApiProperty({ type: String })
  @Type(() => AttributeTypeResDto)
  @Expose()
  type: AttributeTypeResDto;
}
