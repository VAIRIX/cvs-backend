import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ProjectAttributeResDto, ProjectProfessionalsResDto } from '.';
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

  @ApiProperty({ type: ProjectProfessionalsResDto })
  @Type(() => ProjectProfessionalsResDto)
  @Expose()
  professionals: ProjectProfessionalsResDto[];

  @ApiProperty({ type: ProjectAttributeResDto, isArray: true })
  @Type(() => ProjectAttributeResDto)
  @Expose()
  attributes: ProjectAttributeResDto[];
}
