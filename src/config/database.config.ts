import { registerAs } from '@nestjs/config';
import Joi from 'joi';

const DATABASE_CONFIG = 'DATABASE_CONFIG';

export default registerAs(DATABASE_CONFIG, () => {
  const config = {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    dbname: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    type: process.env.DATABASE_TYPE,
  };

  const schema = Joi.object({
    host: Joi.string().required(),
    port: Joi.number().required(),
    username: Joi.string().required(),
    dbname: Joi.string().required(),
    password: Joi.string().required(),
    type: Joi.string().required(),
  });

  const { error, value } = schema.validate(config, {
    convert: true,
    stripUnknown: true,
  });

  if (error) {
    throw new Error(`Invalid database config : ${error.message}`);
  }

  return {
    host: value.host,
    port: value.port,
    user: value.username,
    dbname: value.dbname,
    password: value.password,
    client: value.type,
  } as const;
});
