import sequelize from './src/config/database.js';

const dropAll = async () => {
  try {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');
    const [tables] = await sequelize.query(`
      SELECT TABLE_NAME 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = 'servis_cianjur';
    `);
    
    for (const table of tables) {
      console.log(`Dropping table ${table.TABLE_NAME}...`);
      await sequelize.query(`DROP TABLE IF EXISTS \`${table.TABLE_NAME}\`;`);
    }
    
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
    console.log('Successfully dropped all old tables.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

dropAll();
