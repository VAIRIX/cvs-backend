import { ApiProperty } from '@nestjs/swagger';

export class BuildResumeResDto {
  @ApiProperty({ type: String })
  public resumeUrl?: string;
}
