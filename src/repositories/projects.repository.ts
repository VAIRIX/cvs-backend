import { Injectable } from '@nestjs/common';
import { Req } from 'src/dtos';
import { PaginatedResult } from 'src/types';
import { DataSource, Repository } from 'typeorm';
import { ProjectEntity } from '../entities/project.entity';

@Injectable()
export class ProjectsRepository extends Repository<ProjectEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ProjectEntity, dataSource.createEntityManager());
  }

  public async getProjects(
    filterDto: Req.GetProjectsFilterDto,
  ): Promise<PaginatedResult<ProjectEntity>> {
    const { search, startDate, endDate, pageNumber, pageSize } = filterDto;

    const query = this.createQueryBuilder('project');

    if (search)
      query.andWhere(
        'LOWER(project.name) LIKE LOWER(:search) OR LOWER(project.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );

    if (startDate) query.andWhere('project.from >= :startDate', { startDate });

    if (endDate) query.andWhere('project.to =< :endDate', { endDate });

    query.take(pageSize).skip(pageNumber * pageSize);

    const total = await query.getCount();

    const projects = await query.getMany();

    return {
      items: projects,
      total,
      page: pageNumber,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }
}
