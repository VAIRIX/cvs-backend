import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ProfessionalAttributeResDto } from '.';
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

  @ApiProperty({ type: String })
  @Expose()
  headline: string;

  @ApiProperty({ type: ProfessionalProjectsResDto, isArray: true })
  @Type(() => ProfessionalProjectsResDto)
  @Expose()
  projects: ProfessionalProjectsResDto[];

  @ApiProperty({ type: ProfessionalAttributeResDto, isArray: true })
  @Type(() => ProfessionalAttributeResDto)
  @Expose()
  attributes: ProfessionalAttributeResDto[];
}
