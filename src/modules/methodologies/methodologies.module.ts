import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MethodologyEntity } from 'src/entities';
import { MethodologiesRepository } from 'src/repositories';
import { MethodologiesController } from './methodologies.controller';
import { MethodologiesService } from './methodologies.service';

@Module({
  imports: [TypeOrmModule.forFeature([MethodologyEntity])],
  controllers: [MethodologiesController],
  providers: [MethodologiesService, MethodologiesRepository],
})
export class MethodologiesModule {}
