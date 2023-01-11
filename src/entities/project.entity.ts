import { ENTITIES_VALIDATIONS } from 'src/constants/entities.constants';
import { Column, Entity, OneToMany } from 'typeorm';
import { ProfessionalsProjectsEntity, ProjectAttributesEntity } from '.';
import { BaseEntity } from './base.entity';

@Entity({ name: 'projects' })
export class ProjectEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: ENTITIES_VALIDATIONS.DEFAULT_LENGTH_TEXT,
  })
  name: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  from: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  to: Date;

  @Column({
    type: 'varchar',
    length: ENTITIES_VALIDATIONS.DEFAULT_LENGTH_TEXT,
  })
  duration: string;

  @Column({
    type: 'varchar',
    length: ENTITIES_VALIDATIONS.BIG_TEXT,
  })
  description: string;

  @OneToMany(
    () => ProfessionalsProjectsEntity,
    (projectProfessionals) => projectProfessionals.project,
  )
  professionals: ProfessionalsProjectsEntity[];

  @OneToMany(
    () => ProjectAttributesEntity,
    (projectAttributes) => projectAttributes.project,
  )
  attributes: ProjectAttributesEntity[];
}
