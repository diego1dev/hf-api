import dotenv from 'dotenv';
import { validateEnvs } from './Validate';

dotenv.config();

export const ENV = {
  PREFIX: process.env.PREFIX || '',
  PORT: process.env.PORT || '',
  SQL_HOST: process.env.SQL_HOST || 'localhost',
  SQL_PORT: process.env.SQL_PORT || '5432',
  SQL_DB: process.env.SQL_DB || 'your_database_name',
  SQL_USER: process.env.SQL_USER || 'your_username',
  SQL_PASS: process.env.SQL_PASS || 'your_password',
  JWT_SECRET: process.env.JWT_SECRET || 'SECRET',
  EXPIRE_TOKEN: process.env.EXPIRE_TOKEN || '1h',
};

validateEnvs(ENV);

export default ENV;
