import app from './app.js';
import env from './config/env.js';
import sequelize from './config/database.js';
import logger from './config/logger.js';
import { setupAssociations } from './config/setupAssociations.js';

const startServer = async () => {
  try {
    // Database connection test
    await sequelize.authenticate();
    logger.info('Database connection has been established successfully.');

    // Initialize model associations
    setupAssociations();
    logger.info('Model associations configured.');

    // Sync models (WARNING: In production, use migrations instead of sync)
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    logger.info('Database synchronized.');

    // Start server
    app.listen(env.PORT, () => {
      logger.info(`Server is running on port ${env.PORT}`);
    });
  } catch (error) {
    logger.error('Unable to connect to the database or start server:', error);
    process.exit(1);
  }
};

startServer();
