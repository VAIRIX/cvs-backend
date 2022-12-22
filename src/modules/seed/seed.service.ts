import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ProfessionalProjectsEntity } from 'src/entities';
import {
  ProfessionalsRepository,
  ProjectsRepository,
  ProfessionalsProjectsRepository,
  TechnologiesRepository,
} from 'src/repositories';
import {
  professionalSeed,
  projectsSeed,
  technologiesSeed,
} from './__resources__/data.seed';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    private professionalsRepository: ProfessionalsRepository,
    private projectsRepository: ProjectsRepository,
    private professionalsProjectsRepository: ProfessionalsProjectsRepository,
    private technologiesRepository: TechnologiesRepository,
  ) {}

  async onApplicationBootstrap() {
    const professionalExists = await this.professionalsRepository.find();

    if (professionalExists?.length) return;

    const projects = [];

    for (const technologies of technologiesSeed) {
      await this.technologiesRepository.save(technologies);
    }

    for (const project of projectsSeed) {
      projects.push(
        await this.projectsRepository.save({
          ...project,
          technologies: technologiesSeed,
        }),
      );
    }

    const professional = await this.professionalsRepository.save({
      ...professionalSeed,
      technologies: technologiesSeed,
    });

    const professionalProjects: Partial<ProfessionalProjectsEntity>[] = [];

    for (const project of projects) {
      professionalProjects.push({
        professional,
        project,
        responsibility: `Responsibility for ${project.name}`,
      });
    }

    await this.professionalsProjectsRepository.insert(professionalProjects);
  }
}
