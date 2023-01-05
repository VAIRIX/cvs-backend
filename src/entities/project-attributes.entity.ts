import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectEntity } from '.';
import { AttributesEntity } from './attributes.entity';

@Entity({ name: 'project_attributes' })
export class ProjectAttributesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  attributeId: string;

  @Column()
  projectId: string;

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

  @ManyToOne(() => AttributesEntity, (attribute) => attribute.project)
  attribute: AttributesEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.attributes)
  project: ProjectEntity;
}
