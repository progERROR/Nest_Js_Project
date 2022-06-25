import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { resolve } from 'path';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,

  synchronize: true,

  logging: true,
  logger: 'file',

  entities: [resolve(__dirname, '../**/*.entity{.ts,.js}')],

  ssl: {
    rejectUnauthorized: false,
  },
};

export = config;
