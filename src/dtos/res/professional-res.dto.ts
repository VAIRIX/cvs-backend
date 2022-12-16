import { Expose } from 'class-transformer';
import { BaseResDto } from './base-res.dto';

export class ProfessionalResDto extends BaseResDto {
  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  english: number;

  @Expose()
  about: string;

  @Expose()
  email: string;
}
