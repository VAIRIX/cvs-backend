import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'methodologies' })
export class MethodologyEntity extends BaseEntity {
  @Column()
  name: string;
}
