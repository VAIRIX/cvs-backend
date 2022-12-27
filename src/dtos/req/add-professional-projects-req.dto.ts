import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AddProfessionalProjectsReqDto {
  @ApiProperty({ type: String })
  @Expose()
  responsibility: string;

  @ApiProperty({ type: String })
  @Expose()
  projectId: string;
}
