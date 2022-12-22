import { Injectable } from '@nestjs/common';
import { Req } from 'src/dtos';
import { DataSource, Repository } from 'typeorm';
import { ProfessionalEntity } from '../entities/professional.entity';

@Injectable()
export class ProfessionalsRepository extends Repository<ProfessionalEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ProfessionalEntity, dataSource.createEntityManager());
  }

  public async getProfessionals(
    filterDto: Req.GetProfessionalsFilterDto,
  ): Promise<ProfessionalEntity[]> {
    const { search, minEnglish, maxEnglish } = filterDto;

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
