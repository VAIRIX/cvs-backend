import { Injectable } from '@nestjs/common';
import { Req } from 'src/dtos';
import { ProfessionalsProjectsEntity } from 'src/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ProfessionalsProjectsRepository extends Repository<ProfessionalsProjectsEntity> {
  constructor(private dataSource: DataSource) {
    super(ProfessionalsProjectsEntity, dataSource.createEntityManager());
  }

  public async updateProfessionalProjects(
    professionalId: string,
    projects: Req.AddProjectsToProfessionalReqDto[],
  ) {
    return await this.dataSource.transaction(async (entityManager) => {
      await entityManager.delete(this.metadata.tableName, {
        professionalId,
      });

      const professionalProjects = this.createProfessionalProjectsEntities(
        professionalId,
        projects,
      );

      return await entityManager.save(professionalProjects);
    });
  }

  public createProfessionalProjectsEntities(
    professionalId: string,
    projects: Req.AddProjectsToProfessionalReqDto[],
  ): ProfessionalsProjectsEntity[] {
    const professionalProjectsEntities = projects.map((project) =>
      this.create({
        professionalId,
        projectId: project.projectId,
        responsibility: project.responsibility,
      }),
    );

    return professionalProjectsEntities;
  }

  public createProjectProfessionalsEntities(
    projectId: string,
    professionals: Req.AddProfessionalsToProjectReqDto[],
  ): ProfessionalsProjectsEntity[] {
    const professionalProjectsEntities = professionals.map((professional) =>
      this.create({
        projectId,
        professionalId: professional.professionalId,
        responsibility: professional.responsibility,
      }),
    );

    return professionalProjectsEntities;
  }

  public async updateProjectProfessionals(
    projectId: string,
    professionals: Req.AddProfessionalsToProjectReqDto[],
  ) {
    return await this.dataSource.transaction(async (entityManager) => {
      await entityManager.delete(this.metadata.tableName, {
        projectId,
      });

      const projectProfessionals = this.createProjectProfessionalsEntities(
        projectId,
        professionals,
      );

      return await entityManager.save(projectProfessionals);
    });
  }
}
