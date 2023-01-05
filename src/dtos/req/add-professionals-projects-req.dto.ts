import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

class BaseProfessionalProjectsReqDto {
  @ApiProperty({ type: String })
  responsibility: string;
}

export class AddProjectsToProfessionalReqDto extends BaseProfessionalProjectsReqDto {
  @ApiProperty({ type: String })
  @IsUUID()
  projectId: string;
}

export class AddProfessionalsToProjectReqDto extends BaseProfessionalProjectsReqDto {
  @ApiProperty({ type: String })
  @IsUUID()
  professionalId: string;
}
