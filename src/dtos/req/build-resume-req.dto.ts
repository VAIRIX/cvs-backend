import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class BuildResumeReqDto {
  @IsString()
  @ApiProperty({ type: String, required: true })
  public professionalId!: string;
}
