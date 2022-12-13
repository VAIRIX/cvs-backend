import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENTITIES } from 'src/entities';
import { REPOSITORIES } from '.';

@Module({
  providers: [...REPOSITORIES],
  exports: [...REPOSITORIES],
  imports: [TypeOrmModule.forFeature(ENTITIES)],
})
export class RepositoriesModule {}
