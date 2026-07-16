import { Sequelize } from 'sequelize';
import env from './env.js';
import logger from './logger.js';

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
  host: env.DB_HOST,
  port: env.DB_PORT,
  dialect: 'mysql',
  logging: (msg) => logger.info(msg),
});

export default sequelize;
