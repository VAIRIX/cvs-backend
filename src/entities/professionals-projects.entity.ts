import { ENTITIES_VALIDATIONS } from 'src/constants/entities.constants';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProfessionalEntity, ProjectEntity } from './';

@Entity({ name: 'professionals_projects' })
export class ProfessionalsProjectsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  professionalId: string;

  @Column()
  projectId: string;

  @Column({
    type: 'varchar',
    length: ENTITIES_VALIDATIONS.DEFAULT_LENGTH_TEXT,
  })
  responsibility: string;

  @ManyToOne(() => ProfessionalEntity, (professional) => professional.projects)
  professional: ProfessionalEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.professionals)
  project: ProjectEntity;
}
