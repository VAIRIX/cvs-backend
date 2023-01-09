import { Injectable } from '@nestjs/common';
import { Req } from 'src/dtos';
import { ProjectAttributesEntity } from 'src/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ProjectAttributesRepository extends Repository<ProjectAttributesEntity> {
  constructor(private dataSource: DataSource) {
    super(ProjectAttributesEntity, dataSource.createEntityManager());
  }

  public createProjectAttributeEntities(
    projectId: string,
    attributes: Req.AddAttributeToProjectReqDto[],
  ): ProjectAttributesEntity[] {
    const projectAttributesEntities = attributes?.map((attribute) =>
      this.create({
        attributeId: attribute.attributeId,
        projectId,
        from: attribute.from,
        to: attribute.to || null,
      }),
    );

    return projectAttributesEntities;
  }

  public async updateProjectAttributes(
    projectId: string,
    attributes: Req.AddAttributeToProjectReqDto[],
  ) {
    return await this.dataSource.transaction(async (entityManager) => {
      await entityManager.delete(this.metadata.tableName, {
        projectId,
      });

      const projectAttributes = this.createProjectAttributeEntities(
        projectId,
        attributes,
      );

      return await entityManager.save(projectAttributes);
    });
  }
}
