import { Injectable } from '@nestjs/common';
import { Req } from 'src/dtos';
import { PaginatedResult } from 'src/types';
import { DataSource, Repository } from 'typeorm';
import { ProfessionalEntity } from '../entities/professional.entity';

@Injectable()
export class ProfessionalsRepository extends Repository<ProfessionalEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ProfessionalEntity, dataSource.createEntityManager());
  }

  public async getProfessionals(
    filterDto: Req.GetProfessionalsFilterDto,
  ): Promise<PaginatedResult<ProfessionalEntity>> {
    const { search, minEnglish, maxEnglish, pageSize, pageNumber } = filterDto;

    const query = this.createQueryBuilder('professional');

    if (search) {
      query.andWhere(
        'LOWER(professional.firstName) LIKE LOWER(:search) OR LOWER(professional.lastName) LIKE LOWER(:search) OR LOWER(professional.email) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    if (minEnglish)
      query.andWhere('professional.english >= :minEnglish', { minEnglish });

    if (maxEnglish)
      query.andWhere('professional.english =< :maxEnglish', { maxEnglish });

    query.take(pageSize).skip(pageNumber * pageSize);

    const total = await query.getCount();

    const professionals = await query.getMany();

    return {
      items: professionals,
      total: total,
      pageSize: pageSize,
      page: pageNumber,
      totalPages: Math.ceil(total / pageSize),
    };
  }
}
