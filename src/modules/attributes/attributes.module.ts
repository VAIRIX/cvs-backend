import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeEntity, AttributeTypeEntity } from 'src/entities';
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
