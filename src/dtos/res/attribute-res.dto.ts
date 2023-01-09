import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { AttributeTypeResDto } from '.';
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
