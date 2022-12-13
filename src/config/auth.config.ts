import { registerAs } from '@nestjs/config';
import Joi from 'joi';

const AUTH_CONFIG = 'AUTH_CONFIG';

export default registerAs(AUTH_CONFIG, () => {
  const config = {
    jwtSecret: process.env.AUTH_JWT_SECRET,
    adminUsername: process.env.AUTH_ADMIN_USER,
    adminPassword: process.env.AUTH_ADMIN_PASSWORD,
  };

  const schema = Joi.object({
    jwtSecret: Joi.string().required(),
    adminUsername: Joi.string(),
    adminPassword: Joi.string(),
  });

  const { error, value } = schema.validate(config, {
    convert: true,
    stripUnknown: true,
  });

  if (error) {
    throw new Error(`Invalid auth config: ${error.message}`);
  }

  return {
    jwtSecret: value.jwtSecret,
    adminUsername: value.adminUsername,
    adminPassword: value.adminPassword,
  } as const;
});
