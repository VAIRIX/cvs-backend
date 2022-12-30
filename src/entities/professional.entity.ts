import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import {
  ProfessionalsProjectsEntity,
  TechnologyEntity,
  MethodologyEntity,
} from './';

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

  @Column({
    nullable: true,
  })
  resumeUrl: string;

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
}
