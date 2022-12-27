import { Injectable } from '@nestjs/common';
import { Req } from 'src/dtos';
import { MethodologyEntity } from 'src/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class MethodologiesRepository extends Repository<MethodologyEntity> {
  constructor(private dataSource: DataSource) {
    super(MethodologyEntity, dataSource.createEntityManager());
  }

  public async getMethodologies(
    filterDto: Req.GetMethodologiesFilterDto,
  ): Promise<MethodologyEntity[]> {
    const { search } = filterDto;

    const query = this.createQueryBuilder('methodology');

    if (search)
      query.andWhere('LOWER(methodology.name) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });

    const methodologies = await query.getMany();

    return methodologies;
  }

  public async createMethodology(
    methodology: Req.CreateMethodologyDto,
  ): Promise<MethodologyEntity> {
    const methodologyObject = this.create(methodology);

    await this.save(methodologyObject);

    return methodologyObject;
  }
}
