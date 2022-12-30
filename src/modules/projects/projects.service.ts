import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { plainToInstance } from 'class-transformer';
import { Req, Res } from 'src/dtos';
import {
  ProfessionalsProjectsRepository,
  ProjectsRepository,
} from 'src/repositories';
import { DataSource } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly projectsRepository: ProjectsRepository,
    private readonly professionalsProjectRepository: ProfessionalsProjectsRepository,
    private readonly dataSource: DataSource,
  ) {}

  public async getProjects(
    projectsFilterDto: Req.GetProjectsFilterDto,
  ): Promise<Res.ProjectResDto[]> {
    const projects = await this.projectsRepository.getProjects(
      projectsFilterDto,
    );

    return projects.map((project) =>
      plainToInstance(Res.ProjectResDto, project),
    );
  }

  public async getProjectById(id: string): Promise<Res.ProjectResDto> {
    const project = await this.projectsRepository.findOneOrFail({
      where: { id },
      relations: { professionals: { professional: true } },
    });

    return plainToInstance(Res.ProjectResDto, project);
  }

  public async createProject(
    project: Req.CreateProjectDto,
  ): Promise<Res.ProjectResDto> {
    const createdProject = await this.dataSource.transaction(
      async (entityManager) => {
        const projectEntity = this.projectsRepository.create(project);
        const createdProject = await entityManager.save(projectEntity);

        if (project.professionals?.length > 0) {
          const professionals =
            this.professionalsProjectRepository.createProjectProfessionalsEntities(
              projectEntity.id,
              project.professionals,
            );

          await entityManager.save(professionals);
        }
        return createdProject;
      },
    );

    return await this.getProjectById(createdProject.id);
  }

  public async updateProject(
    id: string,
    projectReqDto: Req.CreateProjectDto,
  ): Promise<Res.ProjectResDto> {
    // TODO: Check if project exists before trying to update
    const { professionals, ...project } = projectReqDto;
    await this.projectsRepository.update(id, { ...project });

    await this.professionalsProjectRepository.updateProjectProfessionals(
      id,
      professionals,
    );

    const updatedProject = await this.getProjectById(id);

    return plainToInstance(Res.ProjectResDto, updatedProject);
  }

  public async deleteProject(id: string): Promise<void> {
    const result = await this.projectsRepository.softDelete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Project with ID "${id}" was not found`);
    }
  }
}
