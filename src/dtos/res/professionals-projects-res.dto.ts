import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ProfessionalResDto } from './professional-res.dto';
import { ProjectResDto } from './project-res.dto';

class BaseProfessionalsProjectsResDto {
  @ApiProperty({ type: String })
  @Expose()
  responsibility: string;
}

export class ProfessionalProjectsResDto extends BaseProfessionalsProjectsResDto {
  @ApiProperty({ type: ProjectResDto })
  @Type(() => ProjectResDto)
  @Expose()
  project: ProjectResDto;
}

export class ProjectProfessionalsResDto extends BaseProfessionalsProjectsResDto {
  @ApiProperty({ type: ProfessionalResDto })
  @Type(() => ProfessionalResDto)
  @Expose()
  professional: ProfessionalResDto;
}
