import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { resolve } from 'path';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'nest-js-proj',

  synchronize: true,

  logging: true,
  logger: 'file',

  entities: [resolve(__dirname, '../**/*.entity{.ts,.js}')],
};

export = config;
