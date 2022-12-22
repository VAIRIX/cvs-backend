import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'projects' })
export class ProjectEntity extends BaseEntity {
  @Column()
  name: string;

  @Column('timestamp')
  from: Date;

  @Column('timestamp', { nullable: true })
  to: Date;

  @Column()
  duration: string;

  @Column()
  description: string;
}
