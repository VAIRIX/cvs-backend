import path from 'path';
import { registerAs } from '@nestjs/config';
import Joi from 'joi';
import { GoogleDocTemplateFields } from 'src/types/google-doc-template-fields.type';

const GOOGLE_CONFIG = 'GOOGLE_CONFIG';

const parseDocTemplateFields = (): GoogleDocTemplateFields => {
  try {
    return JSON.parse(process.env.GOOGLE_DOC_TEMPLATE_FIELDS);
  } catch (error) {
    throw new Error('GOOGLE_DOC_TEMPLATE_FIELDS is not a valid JSON');
  }
};

export default registerAs(GOOGLE_CONFIG, () => {
  const googleDocTemplateFields: GoogleDocTemplateFields =
    parseDocTemplateFields();

  const config = {
    credentialsPath: path.join(
      process.cwd(),
      process.env.GOOGLE_API_SERVICE_ACCOUNT_FILE,
    ),
    scopes: process.env.GOOGLE_API_SCOPE,
    googleDocBaseUrl: process.env.GOOGLE_DOC_BASE_URL,
    googleDriveFolderId: process.env.GOOGLE_DRIVE_FOLDER_ID,
    googleDocTemplateId: process.env.GOOGLE_DOC_TEMPLATE_ID,
    googleDocTemplateMaxProjects: process.env.GOOGLE_DOC_TEMPLATE_MAX_PROJECTS,
    googleDocTemplateFields,
  };

  const schema = Joi.object({
    credentialsPath: Joi.string().required(),
    scopes: Joi.string().required(),
    googleDocBaseUrl: Joi.string().required(),
    googleDriveFolderId: Joi.string().required(),
    googleDocTemplateId: Joi.string().required(),
    googleDocTemplateMaxProjects: Joi.number().required(),
    googleDocTemplateFields: Joi.object().required(),
  });

  const { error, value } = schema.validate(config, {
    convert: true,
    stripUnknown: true,
  });

  if (error) {
    throw new Error(`Invalid google config: ${error.message}`);
  }

  return {
    credentialsPath: value.credentialsPath,
    scopes: value.scopes,
    googleDocBaseUrl: value.googleDocBaseUrl,
    googleDriveFolderId: value.googleDriveFolderId,
    googleDocTemplateId: value.googleDocTemplateId,
    googleDocTemplateMaxProjects: value.googleDocTemplateMaxProjects,
    googleDocTemplateFields: value.googleDocTemplateFields,
  } as const;
});
