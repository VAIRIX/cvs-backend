import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SignInResDto {
  @ApiProperty({ type: String })
  @Expose()
  public accessToken?: string;
}
