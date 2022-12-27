import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ProjectResDto } from './project-res.dto';

export class ProfessionalProjectsResDto {
  @ApiProperty({ type: String })
  @Expose()
  responsibility: string;

  @ApiProperty({ type: ProjectResDto })
  @Type(() => ProjectResDto)
  @Expose()
  project: ProjectResDto;
}
