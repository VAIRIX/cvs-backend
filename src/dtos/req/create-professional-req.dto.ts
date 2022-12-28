import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { DTO_VALIDATIONS } from 'src/constants';
import { AddProfessionalProjectsReqDto } from './add-professional-projects-req.dto';

export class CreateProfessionalDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @MaxLength(DTO_VALIDATIONS.PROFESSIONAL_NAME_LENGTH)
  @IsString()
  firstName: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @MaxLength(DTO_VALIDATIONS.PROFESSIONAL_NAME_LENGTH)
  @IsString()
  lastName: string;

  @ApiProperty({ type: Number, default: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  english: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @MaxLength(DTO_VALIDATIONS.PROFESSIONAL_ABOUT_LENGTH)
  about: string;

  @ApiProperty({ type: String, default: 'example@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  headline: string;

  @ApiProperty({ type: AddProfessionalProjectsReqDto, isArray: true })
  @Type(() => AddProfessionalProjectsReqDto)
  @Expose()
  projects: AddProfessionalProjectsReqDto[];
}
