import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProfessionalEntity, AttributeEntity } from '.';

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

  @ManyToOne(() => AttributeEntity, (attribute) => attribute.professionals)
  attribute: AttributeEntity;

  @ManyToOne(
    () => ProfessionalEntity,
    (professional) => professional.attributes,
  )
  professional: ProfessionalEntity;
}
