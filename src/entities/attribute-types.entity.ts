import { Column, Entity, OneToMany } from 'typeorm';
import { AttributeEntity } from './attribute.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: 'attributes_types' })
export class AttributeTypeEntity extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => AttributeEntity, (attribute) => attribute.type)
  attributes: AttributeEntity[];
}
