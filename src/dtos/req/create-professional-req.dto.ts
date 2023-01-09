import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsAlpha,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { DTO_VALIDATIONS } from 'src/constants';
import {
  AddAttributeToProfessionalReqDto,
  AddProjectsToProfessionalReqDto,
} from '.';

export class CreateProfessionalDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @MaxLength(DTO_VALIDATIONS.PROFESSIONAL_NAME_LENGTH)
  @IsString()
  @IsAlpha()
  firstName: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @MaxLength(DTO_VALIDATIONS.PROFESSIONAL_NAME_LENGTH)
  @IsString()
  @IsAlpha()
  lastName: string;

  @ApiProperty({ type: Number, default: 1 })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  english: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @MaxLength(DTO_VALIDATIONS.PROFESSIONAL_ABOUT_LENGTH)
  @IsString()
  about: string;

  @ApiProperty({ type: String, default: 'example@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  headline: string;

  @ApiProperty({
    type: AddProjectsToProfessionalReqDto,
    isArray: true,
    required: false,
  })
  @Type(() => AddProjectsToProfessionalReqDto)
  @IsOptional()
  @ValidateNested()
  projects: AddProjectsToProfessionalReqDto[];

  @ApiProperty({
    type: AddAttributeToProfessionalReqDto,
    isArray: true,
    required: false,
  })
  @Type(() => AddAttributeToProfessionalReqDto)
  @IsOptional()
  @ValidateNested()
  attributes: AddAttributeToProfessionalReqDto[];
}
