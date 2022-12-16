import { Test, TestingModule } from '@nestjs/testing';
import googleConfig from 'src/config/google.config';
import { ResumeBuilderService } from '../resume-builder.service';
jest.mock('../resume-builder.service');

describe('ResumeBuilderService', () => {
  let service: ResumeBuilderService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResumeBuilderService,
        {
          provide: googleConfig.KEY,
          useValue: {
            credentialsPath: 'credentialsPath',
            scopes: 'scopes',
            googleDocBaseUrl: 'googleDocBaseUrl',
            googleDriveFolderId: 'googleDriveFolderId',
            googleDocTemplateId: 'googleDocTemplateId',
            googleDriveApiVersion: 'googleDriveApiVersion',
            googleDocApiVersion: 'googleDocApiVersion',
            googleDocTemplateMaxProjects: 'googleDocTemplateMaxProjects',
            googleDocTemplateFields: 'googleDocTemplateFields',
          },
        },
      ],
    }).compile();

    service = module.get<ResumeBuilderService>(ResumeBuilderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
