import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class BuildResumeReqDto {
  @ApiProperty({ type: String })
  @IsUUID()
  @IsString()
  public professionalId!: string;
}
