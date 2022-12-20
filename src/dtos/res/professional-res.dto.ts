import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseResDto } from './base-res.dto';

export class ProfessionalResDto extends BaseResDto {
  @ApiProperty({ type: String })
  @Expose()
  firstName: string;

  @ApiProperty({ type: String })
  @Expose()
  lastName: string;

  @ApiProperty({ type: Number })
  @Expose()
  english: number;

  @ApiProperty({ type: String })
  @Expose()
  about: string;

  @ApiProperty({ type: String })
  @Expose()
  email: string;
}
