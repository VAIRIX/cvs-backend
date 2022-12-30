import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { BaseResDto } from './base-res.dto';
import { ProfessionalProjectsResDto } from './professionals-projects-res.dto';

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

  @ApiProperty({ type: String })
  @Expose()
  resumeUrl: string;

  @ApiProperty({ type: ProfessionalProjectsResDto })
  @Type(() => ProfessionalProjectsResDto)
  @Expose()
  projects: ProfessionalProjectsResDto[];
}
