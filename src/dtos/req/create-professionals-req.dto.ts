import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import {
  DTO_PROFESSIONAL_ABOUT_LENGTH,
  DTO_PROFESSIONAL_NAME_LENGTH,
} from 'src/constants';

export class CreateProfessionalDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @MaxLength(DTO_PROFESSIONAL_NAME_LENGTH)
  @IsString()
  firstName: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @MaxLength(DTO_PROFESSIONAL_NAME_LENGTH)
  @IsString()
  lastName: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  english: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @MaxLength(DTO_PROFESSIONAL_ABOUT_LENGTH)
  about: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
