import { ENTITIES_VALIDATIONS } from 'src/constants/entities.constants';
import { Column, Entity, OneToMany } from 'typeorm';
import { ProfessionalAttributesEntity } from '.';
import { BaseEntity } from './base.entity';
import { ProjectAttributesEntity } from './project-attributes.entity';

@Entity({ name: 'attributes' })
export class AttributesEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: ENTITIES_VALIDATIONS.DEFAULT_LENGTH_TEXT,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: ENTITIES_VALIDATIONS.DEFAULT_LENGTH_TEXT,
  })
  type: string;

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
}
