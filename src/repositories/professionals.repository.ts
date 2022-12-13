import { Injectable } from '@nestjs/common';
import { Req } from 'src/dtos';
import { DataSource, Repository } from 'typeorm';
import { ProfessionalEntity } from '../entities/professional.entity';

@Injectable()
export class ProfessionalsRepository extends Repository<ProfessionalEntity> {
  constructor(private dataSource: DataSource) {
    super(ProfessionalEntity, dataSource.createEntityManager());
  }

  public async getProfessionals(
    filterDto: Req.GetProfessionalsFilterDto,
  ): Promise<ProfessionalEntity[]> {
    const { search, min_english, max_english } = filterDto;

    const query = this.createQueryBuilder('professional');

    if (search) {
      query.andWhere(
        'LOWER(professional.firstName) LIKE LOWER(:search) OR LOWER(professional.lastName) LIKE LOWER(:search) OR LOWER(professional.email) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    if (min_english) {
      query.andWhere('professional.english >= :minEnglish', {
        minEnglish: min_english,
      });
    }

    if (max_english) {
      query.andWhere('professional.english =< :maxEnglish', {
        maxEnglish: max_english,
      });
    }

    const professionals = await query.getMany();

    return professionals;
  }

  public async createProfessional(
    professional: Req.CreateProfessionalDto,
  ): Promise<ProfessionalEntity> {
    const professionalObject = this.create(professional);

    await this.save(professionalObject);

    return professionalObject;
  }
}
