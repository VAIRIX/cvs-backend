import { Test, TestingModule } from '@nestjs/testing';
import { AttributesController } from '../attributes.controller';
import { AttributesService } from '../attributes.service';
jest.mock('../attributes.service');

describe('AttributesController', () => {
  let controller: AttributesController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttributesService],
      controllers: [AttributesController],
    }).compile();

    controller = module.get<AttributesController>(AttributesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
