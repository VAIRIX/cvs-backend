import { Test, TestingModule } from '@nestjs/testing';
import { MethodologiesRepository } from 'src/repositories';
import { MethodologiesService } from '../methodologies.service';

jest.mock('../../../repositories/methodologies.repository');

describe('MethodologiesService', () => {
  let service: MethodologiesService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MethodologiesService, MethodologiesRepository],
    }).compile();

    service = module.get<MethodologiesService>(MethodologiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
