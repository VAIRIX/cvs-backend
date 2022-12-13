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
  @IsNotEmpty()
  @MaxLength(DTO_PROFESSIONAL_NAME_LENGTH)
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @MaxLength(DTO_PROFESSIONAL_NAME_LENGTH)
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  english: number;

  @IsNotEmpty()
  @MaxLength(DTO_PROFESSIONAL_ABOUT_LENGTH)
  about: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
