import * as Joi from 'joi';

const envValidationSchema = Joi.object({
  APP_PORT: Joi.number().default(3000),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required()
});

export default envValidationSchema;
