import { Column, DeleteDateColumn, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'admins' })
export class AdminEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 250,
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 250,
  })
  password: string;

  @DeleteDateColumn()
  public deletedAt: Date;
}
