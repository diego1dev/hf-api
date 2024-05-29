import dotenv from 'dotenv';
// import { validateEnvs } from './Validate';

dotenv.config();

export const ENV = {
  PREFIX: process.env.PREFIX || '/api/v1',
  PORT: '8080',
  SQL_HOST: process.env.SQL_HOST || 'holafly.postgres.database.azure.com',
  SQL_PORT: process.env.SQL_PORT || '5432',
  SQL_DB: process.env.SQL_DB || 'postgres',
  SQL_USER: process.env.SQL_USER || 'holafly',
  SQL_PASS: process.env.SQL_PASS || 'sdasrt32dH',
  JWT_SECRET: process.env.JWT_SECRET || '20ed9bf4d077778476aec4469eb0c4fbda79f9dd87e3513623a6078d38ccb55be982d49df0ebd80a08b14f8fb801de750b05c54a5171484e19178a854d29f8c1',
  EXPIRE_TOKEN: process.env.EXPIRE_TOKEN || '1h',
};

console.log('PREFIX-LOG', process.env.PREFIX);

// validateEnvs(ENV);

export default ENV;
