import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BuildResumeResDto {
  @ApiProperty({ type: String })
  @Expose()
  public resumeUrl?: string;
}
