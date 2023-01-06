import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeEntity } from 'src/entities';
import { AttributeTypeEntity } from 'src/entities/attribute-types.entity';
import {
  AttributesRepository,
  AttributeTypesRepository,
} from 'src/repositories';
import { AttributesController } from './attributes.controller';
import { AttributesService } from './attributes.service';

@Module({
  imports: [TypeOrmModule.forFeature([AttributeEntity, AttributeTypeEntity])],
  controllers: [AttributesController],
  providers: [
    AttributesService,
    AttributesRepository,
    AttributeTypesRepository,
  ],
  exports: [AttributesService],
})
export class AttributesModule {}
