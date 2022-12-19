import { Test, TestingModule } from '@nestjs/testing';
import googleConfig from 'src/config/google.config';
import { GoogleService } from '../google.service';
jest.mock('../google.service');

describe('GoogleService', () => {
  let service: GoogleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GoogleService,
        {
          provide: googleConfig.KEY,
          useValue: {
            credentialsPath: 'credentialsPath',
            scopes: 'scopes',
            googleDocBaseUrl: 'googleDocBaseUrl',
            googleDriveFolderId: 'googleDriveFolderId',
            googleDocTemplateId: 'googleDocTemplateId',
            googleDocTemplateMaxProjects: 'googleDocTemplateMaxProjects',
            googleDocTemplateFields: 'googleDocTemplateFields',
          },
        },
      ],
    }).compile();

    service = module.get<GoogleService>(GoogleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
