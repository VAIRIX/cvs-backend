import { Injectable } from '@nestjs/common';
import { AttributeTypeEntity } from 'src/entities/attribute-types.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AttributeTypesRepository extends Repository<AttributeTypeEntity> {
  constructor(private dataSource: DataSource) {
    super(AttributeTypeEntity, dataSource.createEntityManager());
  }
}
