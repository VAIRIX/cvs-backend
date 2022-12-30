import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

class BaseProfessionalProjectsReqDto {
  @ApiProperty({ type: String })
  @Expose()
  responsibility: string;
}

export class AddProfessionalProjectsReqDto extends BaseProfessionalProjectsReqDto {
  @ApiProperty({ type: String })
  @Expose()
  projectId: string;
}

export class AddProjectProfessionalsReqDto extends BaseProfessionalProjectsReqDto {
  @ApiProperty({ type: String })
  @Expose()
  professionalId: string;
}
