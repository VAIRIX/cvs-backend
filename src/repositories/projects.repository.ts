import { Injectable } from '@nestjs/common';
import { Req } from 'src/dtos';
import { DataSource, Repository } from 'typeorm';
import { ProjectEntity } from '../entities/project.entity';

@Injectable()
export class ProjectsRepository extends Repository<ProjectEntity> {
  constructor(private dataSource: DataSource) {
    super(ProjectEntity, dataSource.createEntityManager());
  }

  public async getProjects(
    filterDto: Req.GetProjectsFilterDto,
  ): Promise<ProjectEntity[]> {
    const { search, startDate, endDate } = filterDto;

    const query = this.createQueryBuilder('project');

    if (search)
      query.andWhere(
        'LOWER(project.name) LIKE LOWER(:search) OR LOWER(project.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );

    if (startDate) query.andWhere('project.from >= :startDate', { startDate });

    if (endDate) query.andWhere('project.to =< :endDate', { endDate });

    const projects = await query.getMany();

    return projects;
  }

  public async createProject(
    project: Req.CreateProjectDto,
  ): Promise<ProjectEntity> {
    const projectObject = this.create(project);

    await this.save(projectObject);

    return projectObject;
  }
}
