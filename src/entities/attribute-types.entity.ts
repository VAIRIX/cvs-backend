import { ENTITIES_VALIDATIONS } from 'src/constants';
import { Column, Entity, OneToMany } from 'typeorm';
import { AttributeEntity } from './attribute.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: 'attributes_types' })
export class AttributeTypeEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: ENTITIES_VALIDATIONS.DEFAULT_LENGTH_TEXT,
    unique: true,
  })
  name: string;

  @OneToMany(() => AttributeEntity, (attribute) => attribute.type)
  attributes: AttributeEntity[];
}
