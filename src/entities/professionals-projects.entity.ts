import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProfessionalEntity } from './professional.entity';
import { ProjectEntity } from './project.entity';

@Entity({ name: 'professionals_projects' })
export class ProfessionalsProjectsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  professionalId: string;

  @Column()
  projectId: string;

  @Column()
  responsibility: string;

  @ManyToOne(() => ProfessionalEntity, (professional) => professional.projects)
  professional: ProfessionalEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.professionals)
  project: ProjectEntity;
}
