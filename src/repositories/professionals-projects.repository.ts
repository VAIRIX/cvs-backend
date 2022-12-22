import { Injectable } from '@nestjs/common';
import { ProfessionalProjectsEntity } from 'src/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ProfessionalsProjectsRepository extends Repository<ProfessionalProjectsEntity> {
  constructor(private dataSource: DataSource) {
    super(ProfessionalProjectsEntity, dataSource.createEntityManager());
  }
}
