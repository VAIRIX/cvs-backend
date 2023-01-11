import { ENTITIES_VALIDATIONS } from 'src/constants';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AttributeTypeEntity } from './attribute-types.entity';
import { BaseEntity } from './base.entity';
import { ProfessionalAttributesEntity } from './professional-attributes.entity';
import { ProjectAttributesEntity } from './project-attributes.entity';

@Entity({ name: 'attributes' })
export class AttributeEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: ENTITIES_VALIDATIONS.DEFAULT_LENGTH_TEXT,
  })
  name: string;

  @OneToMany(
    () => ProfessionalAttributesEntity,
    (professionalAttributes) => professionalAttributes.attribute,
  )
  professionals: ProfessionalAttributesEntity[];

  @OneToMany(
    () => ProjectAttributesEntity,
    (projectAttributes) => projectAttributes.attribute,
  )
  project: ProjectAttributesEntity[];

  @ManyToOne(
    () => AttributeTypeEntity,
    (attributeType) => attributeType.attributes,
  )
  type: AttributeTypeEntity;
}
