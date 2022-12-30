import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

class BaseProfessionalProjectsReqDto {
  @ApiProperty({ type: String })
  @Expose()
  responsibility: string;
}

export class AddProjectsToProfessionalReqDto extends BaseProfessionalProjectsReqDto {
  @ApiProperty({ type: String })
  @Expose()
  projectId: string;
}

export class AddProfessionalsToProjectReqDto extends BaseProfessionalProjectsReqDto {
  @ApiProperty({ type: String })
  @Expose()
  professionalId: string;
}
