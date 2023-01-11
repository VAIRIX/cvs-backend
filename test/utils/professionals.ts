import { INestApplication } from '@nestjs/common';
import { Res } from 'src/dtos';
import request from 'supertest';

type createProfessionalProps = {
  app: INestApplication;
  accessToken: string;
  professional: object;
};

type getProfessionalByIdProps = {
  app: INestApplication;
  accessToken: string;
  id: unknown;
};

type getProfessionalsProps = {
  app: INestApplication;
  accessToken: string;
  queries?: object;
};

type updateProfessionalProps = {
  app: INestApplication;
  accessToken: string;
  id: unknown;
  updatedProfessional: object;
};

type deleteProfessionalProps = {
  app: INestApplication;
  accessToken: string;
  id: unknown;
};

const validateBaseProfessional = (professional: Res.ProfessionalResDto) => {
  expect(professional).toHaveProperty('firstName');
  expect(professional).toHaveProperty('lastName');
  expect(professional).toHaveProperty('english');
  expect(professional).toHaveProperty('about');
  expect(professional).toHaveProperty('email');
  expect(professional).toHaveProperty('headline');
  expect(professional).toHaveProperty('resumeUrl');
  expect(professional).toHaveProperty('createdAt');
  expect(professional).toHaveProperty('updatedAt');
  expect(professional).toHaveProperty('id');
};
const validateProfessional = (professional: Res.ProfessionalResDto) => {
  validateBaseProfessional(professional);
  expect(professional).toHaveProperty('projects');
  expect(professional).toHaveProperty('attributes');
};

const validateProfessionalsList = (professionalsResponse) => {
  expect(professionalsResponse).toHaveProperty('items');
  expect(professionalsResponse).toHaveProperty('total');
  expect(professionalsResponse).toHaveProperty('pageSize');
  expect(professionalsResponse).toHaveProperty('page');
  expect(professionalsResponse).toHaveProperty('totalPages');

  if (!!professionalsResponse.items.length) {
    professionalsResponse.items.forEach((professional) =>
      validateBaseProfessional(professional),
    );
  }
};

const createProfessional = ({
  app,
  accessToken,
  professional,
}: createProfessionalProps) =>
  request(app.getHttpServer())
    .post('/professionals')
    .set('Authorization', `Bearer ${accessToken}`)
    .send(professional);

const getProfessionalById = ({
  app,
  accessToken,
  id,
}: getProfessionalByIdProps) =>
  request(app.getHttpServer())
    .get(`/professionals/${id}`)
    .set('Authorization', `Bearer ${accessToken}`);

const getProfessionals = ({
  app,
  accessToken,
  queries,
}: getProfessionalsProps) =>
  request(app.getHttpServer())
    .get('/professionals')
    .set('Authorization', `Bearer ${accessToken}`)
    .query({
      pageNumber: 0,
      pageSize: 10,
      ...queries,
    });

const updateProfessional = ({
  app,
  accessToken,
  id,
  updatedProfessional,
}: updateProfessionalProps) =>
  request(app.getHttpServer())
    .put(`/professionals/${id}`)
    .set('Authorization', `Bearer ${accessToken}`)
    .send(updatedProfessional);

const deleteProfessional = ({
  app,
  accessToken,
  id,
}: deleteProfessionalProps) =>
  request(app.getHttpServer())
    .delete(`/professionals/${id}`)
    .set('Authorization', `Bearer ${accessToken}`);

export {
  createProfessional,
  getProfessionalById,
  getProfessionals,
  updateProfessional,
  deleteProfessional,
  validateProfessional,
  validateBaseProfessional,
  validateProfessionalsList,
};
