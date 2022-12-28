import { Injectable } from '@nestjs/common';
import { Req } from 'src/dtos';
import { ProfessionalProjectsEntity } from 'src/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ProfessionalsProjectsRepository extends Repository<ProfessionalProjectsEntity> {
  constructor(private dataSource: DataSource) {
    super(ProfessionalProjectsEntity, dataSource.createEntityManager());
  }

  public async updateProfessionalProjects(
    professionalId: string,
    projects: Req.AddProfessionalProjectsReqDto[],
  ) {
    return this.dataSource.transaction(async (entityManager) => {
      await entityManager.delete(this.metadata.tableName, {
        professionalId,
      });

      const professionalProjects = this.createProfessionalProjectsEntities(
        professionalId,
        projects,
      );

      return entityManager.save(professionalProjects);
    });
  }

  public createProfessionalProjectsEntities(
    professionalId: string,
    projects: Req.AddProfessionalProjectsReqDto[],
  ): ProfessionalProjectsEntity[] {
    const professionalProjectsEntities = projects.map((project) =>
      this.create({
        professionalId,
        projectId: project.projectId,
        responsibility: project.responsibility,
      }),
    );

    return professionalProjectsEntities;
  }
}
