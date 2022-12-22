import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from '../projects.controller';
import { ProjectsService } from '../projects.service';
jest.mock('../projects.service');

describe('ProjectsController', () => {
  let controller: ProjectsController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectsService],
      controllers: [ProjectsController],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
