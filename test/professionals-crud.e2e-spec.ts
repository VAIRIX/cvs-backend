import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import {
  createProfessional,
  getProfessionalById,
  getProfessionals,
  signIn,
  updateProfessional,
  validateErrorResponse,
  validateProfessional,
  validateProfessionalsResponse,
} from './utils';

const mockProfessional = {
  firstName: 'Juan',
  lastName: 'Pablo',
  english: 3,
  email: 'juanpablo@ex.com',
  about: 'this is an about',
  headline: 'example',
  projects: [],
  attributes: [],
};

describe('Create', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();

    accessToken = await signIn(app);
  });

  describe('should success with', () => {
    it('valid credentials', async () => {
      const { status, body: professional } = await createProfessional({
        app,
        accessToken,
        professional: mockProfessional,
      });

      expect(status).toBe(201);
      validateProfessional(professional);
    });
  });

  describe('should fail with', () => {
    it('invalid firstNames', async () => {
      const invalidFirstNames = [
        {
          statusCode: 400,
          firstName: 'This firstName is too long to be considered a name',
          message: 'firstName must be shorter than or equal to 24 characters',
        },
        {
          statusCode: 400,
          firstName: '',
          message: 'firstName should not be empty',
        },
        {
          statusCode: 400,
          firstName: ',0[];{}:!@#$%^&*()',
          message: 'firstName must contain only letters (a-zA-Z)',
        },
        {
          statusCode: 400,
          firstName: 10,
          message: 'firstName must be a string',
        },
        {
          statusCode: 400,
          firstName: ['foo'],
          message: 'firstName must be a string',
        },
        {
          statusCode: 400,
          firstName: { 0: 'foo' },
          message: 'firstName must be a string',
        },
      ];

      for (const invalidFirsName of invalidFirstNames) {
        const { statusCode, firstName, message } = invalidFirsName;

        const { status, body: errorResponse } = await createProfessional({
          app,
          accessToken,
          professional: { ...mockProfessional, firstName },
        });

        expect(status).toBe(statusCode);
        validateErrorResponse({ errorResponse, message });
      }
    });

    it('invalid lastNames', async () => {
      const invalidLastNames = [
        {
          lastName: 'This lastName is too long to be considered a lastname',
          statusCode: 400,
          message: 'lastName must be shorter than or equal to 24 characters',
        },
        {
          lastName: '',
          statusCode: 400,
          message: 'lastName should not be empty',
        },
        {
          lastName: ',0[];{}:!@#$%^&*()',
          statusCode: 400,
          message: 'lastName must contain only letters (a-zA-Z)',
        },
        {
          lastName: 10,
          statusCode: 400,
          message: 'lastName must be a string',
        },
        {
          lastName: ['foo'],
          statusCode: 400,
          message: 'lastName must be a string',
        },
        {
          lastName: { 0: 'foo' },
          statusCode: 400,
          message: 'lastName must be a string',
        },
      ];

      for (const invalidLastName of invalidLastNames) {
        const { statusCode, lastName, message } = invalidLastName;

        const { status, body: errorResponse } = await createProfessional({
          app,
          accessToken,
          professional: { ...mockProfessional, lastName },
        });

        expect(status).toBe(statusCode);
        validateErrorResponse({ errorResponse, message });
      }
    });

    it('invalid english levels', async () => {
      const invalidEnglishLevels = [
        {
          english: 0,
          statusCode: 400,
          message: 'english must not be less than 1',
        },
        {
          english: 6,
          statusCode: 400,
          message: 'english must not be greater than 5',
        },
        {
          english: 3.5,
          statusCode: 400,
          message: 'english must be an integer number',
        },
        {
          english: '3.5',
          statusCode: 400,
          message: 'english must be an integer number',
        },
        {
          english: '3',
          statusCode: 400,
          message: 'english must be an integer number',
        },
        {
          english: [3],
          statusCode: 400,
          message: 'english must be an integer number',
        },
      ];

      for (const invalidEnglish of invalidEnglishLevels) {
        const { statusCode, english, message } = invalidEnglish;

        const { status, body: errorResponse } = await createProfessional({
          app,
          accessToken,
          professional: { ...mockProfessional, english },
        });

        expect(status).toBe(statusCode);
        validateErrorResponse({ errorResponse, message });
      }
    });

    it('invalid abouts', async () => {
      const invalidAbouts = [
        {
          about: 'invalid'.repeat(1000),
          statusCode: 400,
          message: 'about must be shorter than or equal to 2048 characters',
        },
        {
          about: '',
          statusCode: 400,
          message: 'about should not be empty',
        },
        {
          about: 0,
          statusCode: 400,
          message: 'about must be a string',
        },
        {
          about: [],
          statusCode: 400,
          message: 'about must be a string',
        },
        {
          about: {},
          statusCode: 400,
          message: 'about must be a string',
        },
      ];

      for (const invalidAbout of invalidAbouts) {
        const { statusCode, about, message } = invalidAbout;

        const { status, body: errorResponse } = await createProfessional({
          app,
          accessToken,
          professional: { ...mockProfessional, about },
        });

        expect(status).toBe(statusCode);
        validateErrorResponse({ errorResponse, message });
      }
    });

    it('invalid emails', async () => {
      const invalidEmails = [
        {
          email: '',
          statusCode: 400,
          message: 'email should not be empty',
        },
        {
          email: 'email',
          statusCode: 400,
          message: 'email must be an email',
        },
        {
          email: 'email@',
          statusCode: 400,
          message: 'email must be an email',
        },
        {
          email: '@email',
          statusCode: 400,
          message: 'email must be an email',
        },
        {
          email: '.com',
          statusCode: 400,
          message: 'email must be an email',
        },
        {
          email: 'email@email',
          statusCode: 400,
          message: 'email must be an email',
        },
        {
          email: '0',
          statusCode: 400,
          message: 'email must be an email',
        },
        {
          email: 0,
          statusCode: 400,
          message: 'email must be an email',
        },
      ];

      for (const invalidEmail of invalidEmails) {
        const { statusCode, email, message } = invalidEmail;

        const { status, body: errorResponse } = await createProfessional({
          app,
          accessToken,
          professional: { ...mockProfessional, email },
        });

        expect(status).toBe(statusCode);
        validateErrorResponse({ errorResponse, message });
      }
    });

    it('empty credentials', async () => {
      const { status, body: errorResponse } = await createProfessional({
        app,
        accessToken,
        professional: {},
      });

      expect(status).toBe(400);
      validateErrorResponse({ errorResponse });
    });
  });
});

describe('Get', () => {
  let app: INestApplication;
  let accessToken: string;
  let dummyProfessional;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();

    accessToken = await signIn(app);

    const { body: testProfessional } = await createProfessional({
      app,
      accessToken,
      professional: mockProfessional,
    });

    dummyProfessional = testProfessional;
  });

  describe('all professionals', () => {
    describe('should success with', () => {
      it('emtpy query params', async () => {
        const { status, body: professionalsResponse } = await getProfessionals({
          app,
          accessToken,
        });

        expect(status).toBe(200);
        validateProfessionalsResponse(professionalsResponse);
      });

      it('"search" query param', async () => {
        const searchCases = [
          { statusCode: 200, search: 'Jhon' },
          { statusCode: 200, search: 'Doe' },
        ];

        for (const searchCase of searchCases) {
          const { statusCode, ...queries } = searchCase;
          const { status, body: professionalsResponse } =
            await getProfessionals({
              app,
              accessToken,
              queries,
            });

          expect(status).toBe(statusCode);
          validateProfessionalsResponse(professionalsResponse);
        }
      });

      it('"minEnglish" query param', async () => {
        const searchCases = [{ statusCode: 200, minEnglish: 3 }];

        for (const searchCase of searchCases) {
          const { statusCode, ...queries } = searchCase;
          const { status, body: professionalsResponse } =
            await getProfessionals({
              app,
              accessToken,
              queries,
            });

          expect(status).toBe(statusCode);
          validateProfessionalsResponse(professionalsResponse);
        }
      });

      it.skip('"maxEnglish" query param', async () => {
        const searchCases = [{ statusCode: 200, maxEnglish: 3 }];

        for (const searchCase of searchCases) {
          const { statusCode, ...queries } = searchCase;
          const { status, body: professionalsResponse } =
            await getProfessionals({
              app,
              accessToken,
              queries,
            });

          expect(status).toBe(statusCode);
          validateProfessionalsResponse(professionalsResponse);
        }
      });

      it.skip('given multiple query params', async () => {
        const searchCases = [{ statusCode: 200, maxEnglish: 3 }];

        for (const searchCase of searchCases) {
          const { statusCode, ...queries } = searchCase;
          const { status, body: professionalsResponse } =
            await getProfessionals({
              app,
              accessToken,
              queries,
            });

          expect(status).toBe(statusCode);
          validateProfessionalsResponse(professionalsResponse);
        }
      });
    });

    describe('should fail with', () => {
      it.skip('lower maxEnglish than minEnglish', async () => {
        const searchCases = [{ statusCode: 200, maxEnglish: 1, minEnglish: 3 }];

        for (const searchCase of searchCases) {
          const { statusCode, ...queries } = searchCase;
          const { status, body: professionalsResponse } =
            await getProfessionals({
              app,
              accessToken,
              queries,
            });

          expect(status).toBe(statusCode);
          validateProfessionalsResponse(professionalsResponse);
        }
      });
    });
  });

  describe('professional details', () => {
    describe('should success with', () => {
      it('valid professional Id', async () => {
        const { status, body: professionalResponse } =
          await getProfessionalById({
            app,
            accessToken,
            id: dummyProfessional.id,
          });

        expect(status).toBe(200);
        validateProfessional(professionalResponse);
      });
    });

    describe('should fail with', () => {
      it('invalid professional Ids', async () => {
        const invalidProfessionalIds = [
          {
            statusCode: 400,
            id: '0',
            message: 'Validation failed (uuid is expected)',
          },
          {
            statusCode: 400,
            id: 'id',
            message: 'Validation failed (uuid is expected)',
          },
          {
            statusCode: 400,
            id: 'id'.repeat(100),
            message: 'Validation failed (uuid is expected)',
          },
          {
            statusCode: 400,
            id: {},
            message: 'Validation failed (uuid is expected)',
          },
          {
            statusCode: 400,
            id: 0,
            message: 'Validation failed (uuid is expected)',
          },
        ];

        for (const invalidProfessionalId of invalidProfessionalIds) {
          const { statusCode, id, message } = invalidProfessionalId;

          const { status, body: errorResponse } = await getProfessionalById({
            app,
            accessToken,
            id,
          });

          expect(status).toBe(statusCode);
          validateErrorResponse({ errorResponse, message });
        }
      });
    });
  });
});

describe('Update', () => {
  let app: INestApplication;
  let accessToken: string;
  let dummyProfessional;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();

    accessToken = await signIn(app);

    const { body: testProfessional } = await createProfessional({
      app,
      accessToken,
      professional: mockProfessional,
    });

    dummyProfessional = testProfessional;
  });

  describe('should success with', () => {
    it('valid body params', async () => {
      const professionalUpdates = {
        firstName: 'UpdatedName',
        lastName: 'UpdatedLastname',
        english: 5,
        about: 'Updated about',
        email: 'updated@email.com',
        headline: 'Updated headline',
      };

      const { status, body: updatedProfessional } = await updateProfessional({
        app,
        accessToken,
        id: dummyProfessional.id,
        updatedProfessional: {
          ...dummyProfessional,
          ...professionalUpdates,
        },
      });

      expect(status).toBe(200);
      validateProfessional(updatedProfessional);

      for (const updatedField in professionalUpdates) {
        expect(updatedProfessional[updatedField]).toBe(
          professionalUpdates[updatedField],
        );
      }
    });
  });

  describe('should fail with', () => {
    it('invalid firstNames', async () => {
      const invalidFirstNames = [
        {
          statusCode: 400,
          firstName: 'This firstName is too long to be considered a name',
          message: 'firstName must be shorter than or equal to 24 characters',
        },
        {
          statusCode: 400,
          firstName: '',
          message: 'firstName should not be empty',
        },
        {
          statusCode: 400,
          firstName: ',0[];{}:!@#$%^&*()',
          message: 'firstName must contain only letters (a-zA-Z)',
        },
        {
          statusCode: 400,
          firstName: 10,
          message: 'firstName must be a string',
        },
        {
          statusCode: 400,
          firstName: ['foo'],
          message: 'firstName must be a string',
        },
        {
          statusCode: 400,
          firstName: { 0: 'foo' },
          message: 'firstName must be a string',
        },
      ];

      for (const invalidFirsName of invalidFirstNames) {
        const { statusCode, firstName, message } = invalidFirsName;

        const { status, body: errorResponse } = await updateProfessional({
          app,
          accessToken,
          id: dummyProfessional.id,
          updatedProfessional: { ...dummyProfessional, firstName },
        });

        expect(status).toBe(statusCode);
        validateErrorResponse({ errorResponse, message });
      }
    });

    it('invalid lastNames', async () => {
      const invalidLastNames = [
        {
          lastName: 'This lastName is too long to be considered a lastname',
          statusCode: 400,
          message: 'lastName must be shorter than or equal to 24 characters',
        },
        {
          lastName: '',
          statusCode: 400,
          message: 'lastName should not be empty',
        },
        {
          lastName: ',0[];{}:!@#$%^&*()',
          statusCode: 400,
          message: 'lastName must contain only letters (a-zA-Z)',
        },
        {
          lastName: 10,
          statusCode: 400,
          message: 'lastName must be a string',
        },
        {
          lastName: ['foo'],
          statusCode: 400,
          message: 'lastName must be a string',
        },
        {
          lastName: { 0: 'foo' },
          statusCode: 400,
          message: 'lastName must be a string',
        },
      ];

      for (const invalidLastName of invalidLastNames) {
        const { statusCode, lastName, message } = invalidLastName;

        const { status, body: errorResponse } = await updateProfessional({
          app,
          accessToken,
          id: dummyProfessional.id,
          updatedProfessional: { ...dummyProfessional, lastName },
        });

        expect(status).toBe(statusCode);
        validateErrorResponse({ errorResponse, message });
      }
    });

    it('invalid english levels', async () => {
      const invalidEnglishLevels = [
        {
          english: 0,
          statusCode: 400,
          message: 'english must not be less than 1',
        },
        {
          english: 6,
          statusCode: 400,
          message: 'english must not be greater than 5',
        },
        {
          english: 3.5,
          statusCode: 400,
          message: 'english must be an integer number',
        },
        {
          english: '3.5',
          statusCode: 400,
          message: 'english must be an integer number',
        },
        {
          english: '3',
          statusCode: 400,
          message: 'english must be an integer number',
        },
        {
          english: [3],
          statusCode: 400,
          message: 'english must be an integer number',
        },
      ];

      for (const invalidEnglish of invalidEnglishLevels) {
        const { statusCode, english, message } = invalidEnglish;

        const { status, body: errorResponse } = await updateProfessional({
          app,
          accessToken,
          id: dummyProfessional.id,
          updatedProfessional: { ...dummyProfessional, english },
        });

        expect(status).toBe(statusCode);
        validateErrorResponse({ errorResponse, message });
      }
    });

    it('invalid abouts', async () => {
      const invalidAbouts = [
        {
          about: 'invalid'.repeat(1000),
          statusCode: 400,
          message: 'about must be shorter than or equal to 2048 characters',
        },
        {
          about: '',
          statusCode: 400,
          message: 'about should not be empty',
        },
        {
          about: 0,
          statusCode: 400,
          message: 'about must be a string',
        },
        {
          about: [],
          statusCode: 400,
          message: 'about must be a string',
        },
        {
          about: {},
          statusCode: 400,
          message: 'about must be a string',
        },
      ];

      for (const invalidAbout of invalidAbouts) {
        const { statusCode, about, message } = invalidAbout;

        const { status, body: errorResponse } = await updateProfessional({
          app,
          accessToken,
          id: dummyProfessional.id,
          updatedProfessional: { ...dummyProfessional, about },
        });

        expect(status).toBe(statusCode);
        validateErrorResponse({ errorResponse, message });
      }
    });

    it('invalid emails', async () => {
      const invalidEmails = [
        {
          email: '',
          statusCode: 400,
          message: 'email should not be empty',
        },
        {
          email: 'email',
          statusCode: 400,
          message: 'email must be an email',
        },
        {
          email: 'email@',
          statusCode: 400,
          message: 'email must be an email',
        },
        {
          email: '@email',
          statusCode: 400,
          message: 'email must be an email',
        },
        {
          email: '.com',
          statusCode: 400,
          message: 'email must be an email',
        },
        {
          email: 'email@email',
          statusCode: 400,
          message: 'email must be an email',
        },
        {
          email: '0',
          statusCode: 400,
          message: 'email must be an email',
        },
        {
          email: 0,
          statusCode: 400,
          message: 'email must be an email',
        },
      ];

      for (const invalidEmail of invalidEmails) {
        const { statusCode, email, message } = invalidEmail;

        const { status, body: errorResponse } = await updateProfessional({
          app,
          accessToken,
          id: dummyProfessional.id,
          updatedProfessional: { ...dummyProfessional, email },
        });

        expect(status).toBe(statusCode);
        validateErrorResponse({ errorResponse, message });
      }
    });

    it('empty credentials', async () => {
      const { status, body: errorResponse } = await updateProfessional({
        app,
        accessToken,
        id: dummyProfessional.id,
        updatedProfessional: {},
      });

      expect(status).toBe(400);
      validateErrorResponse({ errorResponse });
    });
  });
});
