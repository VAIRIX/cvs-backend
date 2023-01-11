import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AttributeEntity } from './attribute.entity';
import { ProjectEntity } from './project.entity';

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

  @ManyToOne(() => AttributeEntity, (attribute) => attribute.project)
  attribute: AttributeEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.attributes)
  project: ProjectEntity;
}
