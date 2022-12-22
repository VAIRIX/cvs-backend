import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { MethodologyEntity } from './methodology.entity';
import { ProfessionalProjectsEntity } from './professional-projects.entity';
import { TechnologyEntity } from './technology.entity';

@Entity({ name: 'professionals' })
export class ProfessionalEntity extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  english: number;

  @Column()
  headline: string;

  @Column()
  about: string;

  @OneToMany(
    () => ProfessionalProjectsEntity,
    (professionalProjects) => professionalProjects.professional,
  )
  projects: ProfessionalProjectsEntity[];

  @ManyToMany(() => TechnologyEntity)
  @JoinTable({ name: 'professionals_technologies' })
  technologies: TechnologyEntity[];

  @ManyToMany(() => MethodologyEntity)
  @JoinTable({ name: 'professionals_methodologies' })
  methodologies: MethodologyEntity[];
}
