import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  MONGODB: Joi.required(),
  PORT: Joi.number().default(3002),
  JWT_SECRET: Joi.string().required(),

  /*     DEFAULT_LIMIT: Joi.number().default(6),
   */
});
/* Es para obligar que tengan esas variables de entorno */