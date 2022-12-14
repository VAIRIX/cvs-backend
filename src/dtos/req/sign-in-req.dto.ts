import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInReqDto {
  @IsString()
  @ApiProperty({ type: String, required: true })
  public username!: string;

  @IsString()
  @ApiProperty({ type: String, required: true })
  public password!: string;
}
