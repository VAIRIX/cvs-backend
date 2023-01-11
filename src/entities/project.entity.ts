import { ENTITIES_VALIDATIONS } from 'src/constants/entities.constants';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { MethodologyEntity } from './methodology.entity';
import { ProfessionalsProjectsEntity } from './professionals-projects.entity';
import { ProjectAttributesEntity } from './project-attributes.entity';
import { TechnologyEntity } from './technology.entity';

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

  @ManyToMany(() => TechnologyEntity)
  @JoinTable({ name: 'projects_technologies' })
  technologies: TechnologyEntity[];

  @ManyToMany(() => MethodologyEntity)
  @JoinTable({ name: 'projects_methodologies' })
  methodologies: MethodologyEntity[];

  @OneToMany(
    () => ProjectAttributesEntity,
    (projectAttributes) => projectAttributes.project,
  )
  attributes: ProjectAttributesEntity[];
}
