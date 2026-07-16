import sequelize from './src/config/database.js';
import { setupAssociations } from './src/models/index.js';
setupAssociations();
const run = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');
    await sequelize.drop();
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
    console.log('All tables dropped');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
