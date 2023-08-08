import * as Joi from 'joi';

const envValidationSchema = Joi.object({
  APP_PORT: Joi.number().default(3000)
});
export default envValidationSchema;
