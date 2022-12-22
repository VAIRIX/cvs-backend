import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsRepository } from 'src/repositories';
import { ProjectsService } from '../projects.service';

jest.mock('../../../repositories/projects.repository');

describe('ProjectsService', () => {
  let service: ProjectsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectsService, ProjectsRepository],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
