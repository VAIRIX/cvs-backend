import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseResDto } from './base-res.dto';

export class AttributeTypeResDto extends BaseResDto {
  @ApiProperty({ type: String })
  @Expose()
  name: string;
}
