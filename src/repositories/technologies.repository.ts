import { Injectable } from '@nestjs/common';
import { TechnologyEntity } from 'src/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TechnologiesRepository extends Repository<TechnologyEntity> {
  constructor(private dataSource: DataSource) {
    super(TechnologyEntity, dataSource.createEntityManager());
  }
}
