import { INestApplication } from '@nestjs/common';
import request from 'supertest';

const signIn = async (app: INestApplication) => {
  const response = await request(app.getHttpServer())
    .post('/auth/sign-in')
    .send({
      username: 'admin',
      password: 'admin',
    })
    .expect(200);

  expect(response.body).toHaveProperty('accessToken');

  return response.body.accessToken;
};

const validateErrorResponse = ({
  errorResponse,
  message,
}: {
  errorResponse;
  message?;
}) => {
  expect(errorResponse).toHaveProperty('statusCode');
  expect(errorResponse).toHaveProperty('message');

  if (message) {
    expect(errorResponse.message).toContain(message);
  }
};

export { signIn, validateErrorResponse };

export * from './professionals';
