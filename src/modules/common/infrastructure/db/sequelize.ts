import { ENV } from 'modules/common/utils/env';
import { Sequelize } from 'sequelize';
import { PrettyLogger } from '../logger';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: ENV.SQL_HOST,
  port: +ENV.SQL_PORT,
  database: ENV.SQL_DB,
  username: ENV.SQL_USER,
  password: ENV.SQL_PASS,
  logging: (msg) => PrettyLogger.info(msg),
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // This line can be necessary for certain configurations.
    },
  },
});

export const syncModels = async () => {
  try {
    await sequelize.sync();
    PrettyLogger.info('MODELOS SINCRONIZADOS!!');
  } catch (error) {
    PrettyLogger.error('Error al sincronizar modelos de base de datos:');
    PrettyLogger.error(error);
  }
};
export default sequelize;
