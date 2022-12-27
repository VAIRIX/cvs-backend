import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import {
  MethodologyEntity,
  TechnologyEntity,
  ProfessionalProjectsEntity,
} from '.';
import { BaseEntity } from './base.entity';

@Entity({ name: 'projects' })
export class ProjectEntity extends BaseEntity {
  @Column()
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

  @Column()
  duration: string;

  @Column()
  description: string;

  @OneToMany(
    () => ProfessionalProjectsEntity,
    (professionalProjects) => professionalProjects.project,
  )
  professionals: ProfessionalProjectsEntity[];

  @ManyToMany(() => TechnologyEntity)
  @JoinTable({ name: 'projects_technologies' })
  technologies: TechnologyEntity[];

  @ManyToMany(() => MethodologyEntity)
  @JoinTable({ name: 'projects_methodologies' })
  methodologies: MethodologyEntity[];
}
