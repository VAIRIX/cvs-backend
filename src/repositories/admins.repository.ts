import { Injectable } from '@nestjs/common';
import { AdminEntity } from 'src/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AdminsRepository extends Repository<AdminEntity> {
  constructor(private dataSource: DataSource) {
    super(AdminEntity, dataSource.createEntityManager());
  }
}
