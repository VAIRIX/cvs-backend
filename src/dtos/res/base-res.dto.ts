import { Expose } from 'class-transformer';

export class BaseResDto {
  @Expose()
  id: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
