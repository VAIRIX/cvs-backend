import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { plainToInstance } from 'class-transformer';
import { Req, Res } from 'src/dtos';
import { ProjectsRepository } from 'src/repositories';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

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
    const project = await this.projectsRepository.findOneByOrFail({
      id,
    });

    return plainToInstance(Res.ProjectResDto, project);
  }

  public async createProject(
    project: Req.CreateProjectDto,
  ): Promise<Res.ProjectResDto> {
    const createdProject = await this.projectsRepository.createProject(project);

    return plainToInstance(Res.ProjectResDto, createdProject);
  }

  public async updateProject(
    id: string,
    project: Req.CreateProjectDto,
  ): Promise<Res.ProjectResDto> {
    await this.projectsRepository.update(id, { ...project });

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
