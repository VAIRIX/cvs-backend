import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProfessionalEntity } from '.';
import { AttributesEntity } from './attributes.entity';

@Entity({ name: 'professional_attributes' })
export class ProfessionalAttributesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  attributeId: string;

  @Column()
  professionalId: string;

  @Column({
    type: 'smallint',
  })
  level: number;

  @ManyToOne(() => AttributesEntity, (attribute) => attribute.professionals)
  attribute: AttributesEntity;

  @ManyToOne(
    () => ProfessionalEntity,
    (professional) => professional.attributes,
  )
  professional: ProfessionalEntity;
}
