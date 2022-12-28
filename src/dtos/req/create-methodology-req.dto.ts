import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMethodologyDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  name: string;
}
