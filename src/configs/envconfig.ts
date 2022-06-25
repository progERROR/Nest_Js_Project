import * as Joi from '@hapi/joi';
import { ConfigModuleOptions } from '@nestjs/config';

const config: ConfigModuleOptions = {
  validationSchema: Joi.object({
    PORT: Joi.number(),
    DOMAIN: Joi.string(),
  }),
};

export = config;
