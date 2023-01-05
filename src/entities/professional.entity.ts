import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import {
  ProfessionalsProjectsEntity,
  TechnologyEntity,
  MethodologyEntity,
  ProfessionalAttributesEntity,
} from './';
import { ENTITIES_VALIDATIONS } from 'src/constants/entities.constants';

@Entity({ name: 'professionals' })
export class ProfessionalEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: ENTITIES_VALIDATIONS.SMALL_TEXT,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: ENTITIES_VALIDATIONS.SMALL_TEXT,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: ENTITIES_VALIDATIONS.DEFAULT_LENGTH_TEXT,
  })
  email: string;

  @Column({
    type: 'smallint',
  })
  english: number;

  @Column({
    type: 'varchar',
    length: ENTITIES_VALIDATIONS.DEFAULT_LENGTH_TEXT,
  })
  headline: string;

  @Column({
    type: 'varchar',
    length: ENTITIES_VALIDATIONS.BIG_TEXT,
  })
  about: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: ENTITIES_VALIDATIONS.BIG_TEXT,
  })
  resumeUrl: string;

  @Column({
    default: false,
    type: 'boolean',
  })
  allocated: boolean;

  @OneToMany(
    () => ProfessionalsProjectsEntity,
    (professionalProjects) => professionalProjects.professional,
  )
  projects: ProfessionalsProjectsEntity[];

  @ManyToMany(() => TechnologyEntity)
  @JoinTable({ name: 'professionals_technologies' })
  technologies: TechnologyEntity[];

  @ManyToMany(() => MethodologyEntity)
  @JoinTable({ name: 'professionals_methodologies' })
  methodologies: MethodologyEntity[];

  @OneToMany(
    () => ProfessionalAttributesEntity,
    (professionalAttributes) => professionalAttributes.professional,
  )
  attributes: ProfessionalAttributesEntity[];
}
