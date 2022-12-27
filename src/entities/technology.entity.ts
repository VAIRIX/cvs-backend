import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'technologies' })
export class TechnologyEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  field: string;
}
