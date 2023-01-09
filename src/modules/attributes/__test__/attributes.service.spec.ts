import { Test, TestingModule } from '@nestjs/testing';
import {
  AttributesRepository,
  AttributeTypesRepository,
} from 'src/repositories';
import { DataSource } from 'typeorm';
import { AttributesService } from '../attributes.service';

describe('AttributesService', () => {
  let service: AttributesService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttributesService,
        AttributesRepository,
        {
          provide: DataSource,
          useValue: {
            transaction: jest.fn(),
            createEntityManager: jest.fn(),
          },
        },
        AttributeTypesRepository,
      ],
    }).compile();

    service = module.get<AttributesService>(AttributesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
