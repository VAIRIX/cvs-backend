import { Injectable } from '@nestjs/common';
import { AdminEntity } from 'src/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AdminsRepository extends Repository<AdminEntity> {
  constructor(private dataSource: DataSource) {
    super(AdminEntity, dataSource.createEntityManager());
  }

  async findByUsername(username: string): Promise<AdminEntity> {
    return this.findOneBy({ username });
  }
}
