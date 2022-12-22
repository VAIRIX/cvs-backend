import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseResDto } from './base-res.dto';

export class ProjectResDto extends BaseResDto {
  @ApiProperty({ type: String })
  @Expose()
  name: string;

  @ApiProperty({ type: Date })
  @Expose()
  from: Date;

  @ApiProperty({ type: Date })
  @Expose()
  to: Date;

  @ApiProperty({ type: String })
  @Expose()
  duration: string;

  @ApiProperty({ type: String })
  @Expose()
  description: string;
}
