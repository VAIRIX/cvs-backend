import { ApiProperty } from '@nestjs/swagger';

export class SignInResDto {
  @ApiProperty({ type: String })
  public accessToken?: string;
}
